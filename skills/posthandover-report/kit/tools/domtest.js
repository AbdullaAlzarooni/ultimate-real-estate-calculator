const fs=require("fs");const h=fs.readFileSync(process.argv[2],"utf8");
const css=h.split("<style>")[1].split("</style>")[0]; if(/const |\$\(/.test(css)) throw "css leak";
const js=h.split("<script>")[1].split("</script>")[0];
const els={}; const listeners=[];
const mk=id=>els[id]||(els[id]={id,innerHTML:"",textContent:"",addEventListener(){},parentElement:{hidden:false}} );
global.document={querySelector:s=>mk(s),addEventListener:(t,f)=>listeners.push([t,f]),title:""};
global.window=global;
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
