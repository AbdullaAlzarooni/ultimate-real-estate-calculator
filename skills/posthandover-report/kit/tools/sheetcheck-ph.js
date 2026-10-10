// Compares the report with a literal transcription of the Post-Handover Property Evaluation Form
// (master tab "Post-Handover Properties Evaluation Form", cells C16–C84). Usage: node tools/sheetcheck-ph.js <report.html> [40]
const fs=require("fs");const h=fs.readFileSync(process.argv[2],"utf8");
const js=h.split("<script>")[1].split("</script>")[0];
const els={};const mk=id=>els[id]||(els[id]={id,innerHTML:"",textContent:"",addEventListener(){},parentElement:{hidden:false}});
global.document={querySelector:s=>mk(s),addEventListener(){},title:""};global.window=global;
const inj=js.replace(/(const casePsf=[^\n]*\n)/,"$1globalThis.__x={D,calc,rentF,appF,casePsf,gOf,rgOf:i=>{const b=D.growth.rent.used;return [-5,0,b,Math.max(8,b+3)][i]}};\n");if(inj===js)throw "noinj";eval(inj);
const {D,calc,rentF,appF,casePsf,gOf,rgOf}=__x;
const plus40=process.argv[3]==="40";
function sheet(i){ // i = the sheet's inputs, named by cell
  const D16=i.C6*0.04+(plus40?40:0), D31=D16+i.D17+i.C6;                 // payment plan rows sum to 100% of price
  const C47=i.C36*Math.pow(1+i.C38,i.C37)*(1+i.C39)+i.C40;                // gross rent
  const C41=i.C42*C47, C43=i.C44*12;
  const C45=i.C8===0?i.C7*i.C10*1.05:i.C10*(i.C8+i.C9*0.25)*1.05;
  const C48=C47-C41-C43-C45-i.C46;                                       // net rent
  const C51=C47/i.C6, C53=C48*i.C52, C54=D31-C53, C55=C48/C54, C56=1/C55;
  const C62=i.C6/i.C7, C64=(i.C63-C62)/C62;
  const C74=i.C63*i.C7*Math.pow(1+i.C72,i.G??i.C71)*(1+i.C73);   // G = years of price growth (handover if growth stops there)
  const C77=-C54, C78=-0.02*C74*1.05, C81=C74+C77+C78, C82=-C81/(C77+C78), C83=Math.pow(1+C82,1/i.C71)-1;
  return {net:C48,grossY:C51,rentDuring:C53,cashNet:C54,yCash:C55,payback:C56,cgr:C64,sellH:C74,profitH:C81,lifeH:C82,annH:C83};
}
const keys=["net","grossY","rentDuring","cashNet","yCash","cgr","sellH","profitH","lifeH","annH"];let n=0,maxd={},rows=[];
D.sources.forEach(s=>[0,1,2].forEach(ci=>[0,1,2,3].forEach(gi=>[0,1,2,3].forEach(ri=>{
  const ps=casePsf(s,ci),G=gOf(gi),RG=rgOf(ri),r=calc({...s,psf:ps},G,RG);
  const q=sheet({C6:D.price,C7:D.size,C8:D.internal||0,C9:D.balcony||0,C10:D.sc,D17:D.oqood,C36:s.rent,C37:D.years,C38:RG/100,C39:rentF,C40:D.furnPrem,
    C42:D.mgmt/100,C44:D.util,C46:D.furniture,C52:D.phppYears,C63:ps,C71:D.holdYears,G:D.priceGrowthTo==="handover"?D.years:D.holdYears,C72:G/100,C73:appF});
  n++;keys.forEach(k=>{const d=Math.abs(r[k]-q[k]);if(!(maxd[k]>=d))maxd[k]=d;});
  if(ri===2&&gi===2) rows.push([s.name,["Cons","Norm","Opt"][ci],Math.round(q.net),(q.yCash*100).toFixed(2)+"%",Math.round(q.sellH),Math.round(q.profitH),(q.annH*100).toFixed(2)+"%"]);
}))));
console.log("combos",n,"plus40",plus40,"max abs diff",JSON.stringify(maxd));
console.table(rows);
