const fs=require("fs");const h=fs.readFileSync(process.argv[2],"utf8");
const js=[...h.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]).find(x=>x.includes("const UNITS"));
/* a minimal page for Node: enough of the DOM for the report script to run */
const els={};const L=[];const listeners=L;
const mkE=id=>({id,innerHTML:"",textContent:"",value:"",hidden:false,disabled:false,max:0,min:0,style:{setProperty(){}},dataset:{},children:[],classList:{add(){},remove(){},toggle(){},contains(){return false}},addEventListener(){},removeEventListener(){},setAttribute(){},getAttribute(){return null},removeAttribute(){},appendChild(){},insertAdjacentHTML(){},scrollIntoView(){},scrollBy(){},scrollTo(){},focus(){},blur(){},click(){},closest(){return null},querySelector(s){return mk(id+" "+s)},querySelectorAll(){return []},getBoundingClientRect(){return {left:0,top:0,right:0,bottom:0,width:0,height:0}},parentElement:{hidden:false,style:{}},firstChild:null,offsetParent:{},scrollWidth:0,clientWidth:0,scrollLeft:0,scrollTop:0,scrollHeight:0,clientHeight:0});
const mk=id=>els[id]||(els[id]=mkE(id));
global.document={querySelector:s=>mk(s),querySelectorAll:()=>[],getElementById:i=>mk("#"+i),createElement:t=>mkE(t),addEventListener:(t,f)=>L.push([t,f]),body:mkE("body"),documentElement:mkE("html"),title:"",activeElement:null};
global.window=global;global.requestAnimationFrame=()=>0;global.location={href:"",hash:"",search:""};global.innerWidth=1300;
global.matchMedia=()=>({matches:false,addEventListener(){},addListener(){}});
eval(js);
const click=ds=>L.filter(l=>l[0]==="click").forEach(l=>l[1]({target:{closest:sel=>sel.includes("data-si")?{dataset:ds}:null}}));
let bad=[];
// number of data sources = distinct data-si buttons rendered (1–3)
const SI=[...new Set(Object.values(els).map(e=>e.innerHTML).join("").match(/data-si="\d+"/g)||['data-si="0"'])].map(x=>+x.match(/\d+/)[0]);
for(const si of SI)for(const ci of [0,1,2])for(const gi of [0,1,2,3])for(const ri of [0,1,2,3]){click({si:""+si});click({ci:""+ci});click({gi:""+gi});click({ri:""+ri});
 for(const [k,e] of Object.entries(els)){const t=e.innerHTML+e.textContent;if(/NaN|undefined|Infinity|null</.test(t))bad.push([si,ci,gi,ri,k,t.match(/.{0,40}(NaN|undefined|Infinity|null<).{0,20}/)[0]]);}}
console.log("bad",bad.length,bad.slice(0,5));
click({si:""+SI[SI.length-1]});click({ci:"1"});click({gi:"2"});click({ri:"2"});
const T=id=>(els[id]?.innerHTML||"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();
for(const id of ["#verdict","#dc-lede","#checks","#ruler","#scen","#cases","#rscen","#plan","#dld-note","#tabs"]) console.log("\n==",id,"\n",T(id).slice(0,900));
