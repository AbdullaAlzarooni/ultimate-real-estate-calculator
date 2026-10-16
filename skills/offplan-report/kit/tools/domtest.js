const fs=require("fs");const h=fs.readFileSync(process.argv[2],"utf8");
const css=h.split("<style>")[1].split("</style>")[0]; if(/const |\$\(/.test(css)) throw "css leak";
const js=[...h.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]).find(x=>x.includes("const UNITS"));
/* a minimal page for Node: enough of the DOM for the report script to run */
const els={};const L=[];const listeners=L;
const mkE=id=>({id,innerHTML:"",textContent:"",value:"",hidden:false,disabled:false,max:0,min:0,style:{setProperty(){}},dataset:{},children:[],classList:{add(){},remove(){},toggle(){},contains(){return false}},addEventListener(){},removeEventListener(){},setAttribute(){},getAttribute(){return null},removeAttribute(){},appendChild(){},insertAdjacentHTML(){},scrollIntoView(){},scrollBy(){},scrollTo(){},focus(){},blur(){},click(){},closest(){return null},querySelector(s){return mk(id+" "+s)},querySelectorAll(){return []},getBoundingClientRect(){return {left:0,top:0,right:0,bottom:0,width:0,height:0}},parentElement:{hidden:false,style:{}},firstChild:null,offsetParent:{},scrollWidth:0,clientWidth:0,scrollLeft:0,scrollTop:0,scrollHeight:0,clientHeight:0});
const mk=id=>els[id]||(els[id]=mkE(id));
global.document={querySelector:s=>mk(s),querySelectorAll:()=>[],getElementById:i=>mk("#"+i),createElement:t=>mkE(t),addEventListener:(t,f)=>L.push([t,f]),body:mkE("body"),documentElement:mkE("html"),title:"",activeElement:null};
global.window=global;global.requestAnimationFrame=()=>0;global.location={href:"",hash:"",search:""};global.innerWidth=1300;
global.matchMedia=()=>({matches:false,addEventListener(){},addListener(){}});

eval(js+"\n;globalThis.UNITS=UNITS;");
const out={};
for(const k of Object.keys(UNITS)){ // simulate clicking each type
  const ev={target:{closest:sel=>sel==="[data-ui]"?{dataset:{ui:k}}:null}};
  listeners.filter(l=>l[0]==="click").forEach(l=>l[1](ev));
  const v=els["#verdict"].innerHTML.replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();
  out[k]={title:document.title,verdict:v.slice(0,170),cols:(els["#results"].innerHTML.match(/<th class="src">/g)||[]).length,checks:(els["#checks"].innerHTML.match(/class="check /g)||[]).length,comfort:(els["#comfort"].innerHTML.match(/class="cf /g)||[]).length,notes:(els["#notes"].innerHTML.match(/<li>/g)||[]).length};
}
console.log(JSON.stringify(out,null,1));
// test source/case/growth clicks on 3BR
const click=ds=>listeners.filter(l=>l[0]==="click").forEach(l=>l[1]({target:{closest:sel=>sel.includes("data-si")?{dataset:ds}:null}}));
click({si:"0"});click({gi:"1"});click({ci:"0"});
console.log("after clicks:",els["#verdict"].innerHTML.replace(/<[^>]+>/g," ").replace(/\s+/g," ").slice(0,160));
