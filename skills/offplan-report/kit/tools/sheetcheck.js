const fs=require("fs");const h=fs.readFileSync(process.argv[2],"utf8");
const js=h.split("<script>")[1].split("</script>")[0];
const els={};const mk=id=>els[id]||(els[id]={id,innerHTML:"",textContent:"",addEventListener(){},parentElement:{hidden:false}});
global.document={querySelector:s=>mk(s),addEventListener(){},title:""};global.window=global;
const inj=js.replace(/(const casePsf=[^\n]*\n)/,"$1globalThis.__x={D,calc,rentF,appF,casePsf,gOf,rgOf:i=>{const b=D.growth.rent.used;return [-5,0,b,Math.max(8,b+3)][i]}};\n");if(inj===js)throw "noinj";eval(inj);
const {D,calc,rentF,appF,casePsf,gOf,rgOf}=__x;
const plus40=process.argv[3]==="40";
// literal transcription of the master sheet formulas
function sheet(C6,C7,C8,C9,C10,C17,C30,C31,C32,C33,C34,C36,C38,C40,C54,C62,C63,C64){
  const D16=C6*0.04+(plus40?40:0), D25=D16+C17+C6; // D18:D24 plan % × price = price
  const C41=C30*Math.pow(1+C32,C31)*(1+C33)+C34, C35=C36*C41, C37=C38*12;
  const C39=C8===0?C7*C10*1.05:C10*(C8+C9*0.25)*1.05;
  const C42=C41-C35-C37-C39-C40, C46=C42/D25, C53=C6/C7, C55=(C54-C53)/C53;
  const C65=C54*C7*Math.pow(1+C63,C62)*(1+C64);
  const costs=-C6-C17-D16-0.02*C65*1.05, C74=C65+costs, C75=-C74/costs, C76=Math.pow(1+C75,1/C62)-1;
  return {net:C42,yld:C46,cgr:C55,sell:C65,profit:C74,life:C75,ann:C76};
}
const keys=["net","yld","cgr","sell","profit","life","ann"];let n=0,maxd={},rows=[];
const cn=["Cons","Norm","Opt"];
D.sources.forEach((s,si)=>[0,1,2].forEach(ci=>[0,1,2,3].forEach(gi=>[0,1,2,3].forEach(ri=>{
  const ps=casePsf(s,ci),G=gOf(gi),RG=rgOf(ri);
  const r=calc({...s,psf:ps},G,RG);
  const q=sheet(D.price,D.size,D.internal||0,D.balcony||0,D.sc,D.oqood,s.rent,D.years,RG/100,rentF,D.furnPrem,D.mgmt/100,D.util,D.furniture,ps,D.years,G/100,appF);
  n++;keys.forEach(k=>{const d=Math.abs(r[k]-q[k]);if(!(maxd[k]>=d))maxd[k]=d;});
  if(ri===2&&gi===2) rows.push([s.name,cn[ci],Math.round(ps),Math.round(q.net),(q.yld*100).toFixed(2)+"%",Math.round(q.sell),Math.round(q.profit),(q.life*100).toFixed(2)+"%",(q.ann*100).toFixed(2)+"%",Math.round(r.profit)]);
}))));
console.log("combos",n,"plus40",plus40,"max abs diff",JSON.stringify(maxd));
console.table(rows);
console.log("rentF",rentF,"appF",appF);
