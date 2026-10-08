const fs=require("fs");const h=fs.readFileSync(process.argv[2],"utf8");
const js=h.split("<script>")[1].split("</script>")[0];
const els={};const L=[];const mk=id=>els[id]||(els[id]={id,innerHTML:"",textContent:"",addEventListener(){},parentElement:{hidden:false}});
global.document={querySelector:s=>mk(s),addEventListener:(t,f)=>L.push([t,f]),title:""};global.window=global;eval(js);
const click=ds=>L.filter(l=>l[0]==="click").forEach(l=>l[1]({target:{closest:sel=>sel.includes("data-si")?{dataset:ds}:null}}));
let bad=[];
for(const si of [0,1,2])for(const ci of [0,1,2])for(const gi of [0,1,2,3])for(const ri of [0,1,2,3]){click({si:""+si});click({ci:""+ci});click({gi:""+gi});click({ri:""+ri});
 for(const [k,e] of Object.entries(els)){const t=e.innerHTML+e.textContent;if(/NaN|undefined|Infinity|null</.test(t))bad.push([si,ci,gi,ri,k,t.match(/.{0,40}(NaN|undefined|Infinity|null<).{0,20}/)[0]]);}}
console.log("bad",bad.length,bad.slice(0,5));
click({si:"2"});click({ci:"1"});click({gi:"2"});click({ri:"2"});
const T=id=>(els[id]?.innerHTML||"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();
for(const id of ["#verdict","#dc-lede","#checks","#ruler","#scen","#cases","#rscen","#plan","#dld-note","#tabs"]) console.log("\n==",id,"\n",T(id).slice(0,900));
