import{S as et,i as tt,s as nt,a as rt,e as B,c as at,b as W,g as he,t as J,d as me,f as z,h as G,j as ot,o as Ie,k as st,l as it,m as lt,n as ke,p as V,q as ct,r as ft,u as ut,v as X,w as Z,x as Pe,y as Q,z as x,A as fe}from"./chunks/index-8bd12b80.js";import{g as Me,f as We,s as M,a as je,b as pt,i as dt}from"./chunks/singletons-1c6cb706.js";import{_ as Se}from"./chunks/preload-helper-b21cceae.js";function ht(r,e){return r==="/"||e==="ignore"?r:e==="never"?r.endsWith("/")?r.slice(0,-1):r:e==="always"&&!r.endsWith("/")?r+"/":r}function mt(r){return r.split("%25").map(decodeURI).join("%25")}function gt(r){for(const e in r)r[e]=decodeURIComponent(r[e]);return r}const _t=["href","pathname","search","searchParams","toString","toJSON"];function wt(r,e){const n=new URL(r);for(const s of _t){let o=n[s];Object.defineProperty(n,s,{get(){return e(),o},enumerable:!0,configurable:!0})}return yt(n),n}function yt(r){Object.defineProperty(r,"hash",{get(){throw new Error("Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead")}})}const bt="/__data.json";function vt(r){return r.replace(/\/$/,"")+bt}function Et(r){let e=5381;if(typeof r=="string"){let n=r.length;for(;n;)e=e*33^r.charCodeAt(--n)}else if(ArrayBuffer.isView(r)){const n=new Uint8Array(r.buffer,r.byteOffset,r.byteLength);let s=n.length;for(;s;)e=e*33^n[--s]}else throw new TypeError("value must be a string or TypedArray");return(e>>>0).toString(36)}const ge=window.fetch;window.fetch=(r,e)=>{if((r instanceof Request?r.method:(e==null?void 0:e.method)||"GET")!=="GET"){const s=new URL(r instanceof Request?r.url:r.toString(),document.baseURI).href;ae.delete(s)}return ge(r,e)};const ae=new Map;function kt(r,e){const n=Qe(r,e),s=document.querySelector(n);if(s!=null&&s.textContent){const{body:o,...g}=JSON.parse(s.textContent),t=s.getAttribute("data-ttl");return t&&ae.set(n,{body:o,init:g,ttl:1e3*Number(t)}),Promise.resolve(new Response(o,g))}return ge(r,e)}function St(r,e,n){if(ae.size>0){const s=Qe(r,n),o=ae.get(s);if(o){if(performance.now()<o.ttl)return new Response(o.body,o.init);ae.delete(s)}}return ge(e,n)}function Qe(r,e){let s=`script[data-sveltekit-fetched][data-url=${JSON.stringify(r instanceof Request?r.url:r)}]`;return(e==null?void 0:e.body)&&(typeof e.body=="string"||ArrayBuffer.isView(e.body))&&(s+=`[data-hash="${Et(e.body)}"]`),s}const Rt=/^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;function $t(r){const e=[],n=[],s=[];let o=!0;return{pattern:r==="/"?/^\/$/:new RegExp(`^${It(r).map((t,u,m)=>{const h=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(t);if(h)return e.push(h[1]),n.push(h[2]),s.push(!1),"(?:/(.*))?";const _=/^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(t);if(_)return e.push(_[1]),n.push(_[2]),s.push(!0),"(?:/([^/]+))?";const b=u===m.length-1;return t?"/"+t.split(/\[(.+?)\](?!\])/).map((N,L)=>{if(L%2){if(N.startsWith("x+"))return Re(String.fromCharCode(parseInt(N.slice(2),16)));if(N.startsWith("u+"))return Re(String.fromCharCode(...N.slice(2).split("-").map(ee=>parseInt(ee,16))));const C=Rt.exec(N);if(!C)throw new Error(`Invalid param: ${N}. Params and matcher names can only have underscores and alphanumeric characters.`);const[,D,se,H,ie]=C;return e.push(H),n.push(ie),s.push(!!D),se?"(.*?)":D?"([^/]*)?":"([^/]+?)"}return b&&N.includes(".")&&(o=!1),Re(N)}).join(""):void 0}).join("")}${o?"/?":""}$`),names:e,types:n,optional:s}}function Ot(r){return!/^\([^)]+\)$/.test(r)}function It(r){return r.slice(1).split("/").filter(Ot)}function jt(r,{names:e,types:n,optional:s},o){const g={};for(let t=0;t<e.length;t+=1){const u=e[t],m=n[t];let h=r[t+1];if(h||!s[t]){if(m){const _=o[m];if(!_)throw new Error(`Missing "${m}" param matcher`);if(!_(h))return}g[u]=h!=null?h:""}}return g}function Re(r){return r.normalize().replace(/[[\]]/g,"\\$&").replace(/%/g,"%25").replace(/\//g,"%2[Ff]").replace(/\?/g,"%3[Ff]").replace(/#/g,"%23").replace(/[.*+?^${}()|\\]/g,"\\$&")}function Lt(r,e,n,s){const o=new Set(e);return Object.entries(n).map(([u,[m,h,_]])=>{const{pattern:b,names:R,types:K,optional:N}=$t(u),L={id:u,exec:C=>{const D=b.exec(C);if(D)return jt(D,{names:R,types:K,optional:N},s)},errors:[1,..._||[]].map(C=>r[C]),layouts:[0,...h||[]].map(t),leaf:g(m)};return L.errors.length=L.layouts.length=Math.max(L.errors.length,L.layouts.length),L});function g(u){const m=u<0;return m&&(u=~u),[m,r[u]]}function t(u){return u===void 0?u:[o.has(u),r[u]]}}function At(r){let e,n,s;var o=r[0][0];function g(t){return{props:{data:t[2],form:t[1]}}}return o&&(e=X(o,g(r))),{c(){e&&Z(e.$$.fragment),n=B()},l(t){e&&Pe(e.$$.fragment,t),n=B()},m(t,u){e&&Q(e,t,u),W(t,n,u),s=!0},p(t,u){const m={};if(u&4&&(m.data=t[2]),u&2&&(m.form=t[1]),o!==(o=t[0][0])){if(e){he();const h=e;J(h.$$.fragment,1,0,()=>{x(h,1)}),me()}o?(e=X(o,g(t)),Z(e.$$.fragment),z(e.$$.fragment,1),Q(e,n.parentNode,n)):e=null}else o&&e.$set(m)},i(t){s||(e&&z(e.$$.fragment,t),s=!0)},o(t){e&&J(e.$$.fragment,t),s=!1},d(t){t&&G(n),e&&x(e,t)}}}function Nt(r){let e,n,s;var o=r[0][0];function g(t){return{props:{data:t[2],$$slots:{default:[Pt]},$$scope:{ctx:t}}}}return o&&(e=X(o,g(r))),{c(){e&&Z(e.$$.fragment),n=B()},l(t){e&&Pe(e.$$.fragment,t),n=B()},m(t,u){e&&Q(e,t,u),W(t,n,u),s=!0},p(t,u){const m={};if(u&4&&(m.data=t[2]),u&523&&(m.$$scope={dirty:u,ctx:t}),o!==(o=t[0][0])){if(e){he();const h=e;J(h.$$.fragment,1,0,()=>{x(h,1)}),me()}o?(e=X(o,g(t)),Z(e.$$.fragment),z(e.$$.fragment,1),Q(e,n.parentNode,n)):e=null}else o&&e.$set(m)},i(t){s||(e&&z(e.$$.fragment,t),s=!0)},o(t){e&&J(e.$$.fragment,t),s=!1},d(t){t&&G(n),e&&x(e,t)}}}function Pt(r){let e,n,s;var o=r[0][1];function g(t){return{props:{data:t[3],form:t[1]}}}return o&&(e=X(o,g(r))),{c(){e&&Z(e.$$.fragment),n=B()},l(t){e&&Pe(e.$$.fragment,t),n=B()},m(t,u){e&&Q(e,t,u),W(t,n,u),s=!0},p(t,u){const m={};if(u&8&&(m.data=t[3]),u&2&&(m.form=t[1]),o!==(o=t[0][1])){if(e){he();const h=e;J(h.$$.fragment,1,0,()=>{x(h,1)}),me()}o?(e=X(o,g(t)),Z(e.$$.fragment),z(e.$$.fragment,1),Q(e,n.parentNode,n)):e=null}else o&&e.$set(m)},i(t){s||(e&&z(e.$$.fragment,t),s=!0)},o(t){e&&J(e.$$.fragment,t),s=!1},d(t){t&&G(n),e&&x(e,t)}}}function He(r){let e,n=r[5]&&Ye(r);return{c(){e=st("div"),n&&n.c(),this.h()},l(s){e=it(s,"DIV",{id:!0,"aria-live":!0,"aria-atomic":!0,style:!0});var o=lt(e);n&&n.l(o),o.forEach(G),this.h()},h(){ke(e,"id","svelte-announcer"),ke(e,"aria-live","assertive"),ke(e,"aria-atomic","true"),V(e,"position","absolute"),V(e,"left","0"),V(e,"top","0"),V(e,"clip","rect(0 0 0 0)"),V(e,"clip-path","inset(50%)"),V(e,"overflow","hidden"),V(e,"white-space","nowrap"),V(e,"width","1px"),V(e,"height","1px")},m(s,o){W(s,e,o),n&&n.m(e,null)},p(s,o){s[5]?n?n.p(s,o):(n=Ye(s),n.c(),n.m(e,null)):n&&(n.d(1),n=null)},d(s){s&&G(e),n&&n.d()}}}function Ye(r){let e;return{c(){e=ct(r[6])},l(n){e=ft(n,r[6])},m(n,s){W(n,e,s)},p(n,s){s&64&&ut(e,n[6])},d(n){n&&G(e)}}}function Ut(r){let e,n,s,o,g;const t=[Nt,At],u=[];function m(_,b){return _[0][1]?0:1}e=m(r),n=u[e]=t[e](r);let h=r[4]&&He(r);return{c(){n.c(),s=rt(),h&&h.c(),o=B()},l(_){n.l(_),s=at(_),h&&h.l(_),o=B()},m(_,b){u[e].m(_,b),W(_,s,b),h&&h.m(_,b),W(_,o,b),g=!0},p(_,[b]){let R=e;e=m(_),e===R?u[e].p(_,b):(he(),J(u[R],1,1,()=>{u[R]=null}),me(),n=u[e],n?n.p(_,b):(n=u[e]=t[e](_),n.c()),z(n,1),n.m(s.parentNode,s)),_[4]?h?h.p(_,b):(h=He(_),h.c(),h.m(o.parentNode,o)):h&&(h.d(1),h=null)},i(_){g||(z(n),g=!0)},o(_){J(n),g=!1},d(_){u[e].d(_),_&&G(s),h&&h.d(_),_&&G(o)}}}function Tt(r,e,n){let{stores:s}=e,{page:o}=e,{components:g}=e,{form:t}=e,{data_0:u=null}=e,{data_1:m=null}=e;ot(s.page.notify);let h=!1,_=!1,b=null;return Ie(()=>{const R=s.page.subscribe(()=>{h&&(n(5,_=!0),n(6,b=document.title||"untitled page"))});return n(4,h=!0),R}),r.$$set=R=>{"stores"in R&&n(7,s=R.stores),"page"in R&&n(8,o=R.page),"components"in R&&n(0,g=R.components),"form"in R&&n(1,t=R.form),"data_0"in R&&n(2,u=R.data_0),"data_1"in R&&n(3,m=R.data_1)},r.$$.update=()=>{r.$$.dirty&384&&s.page.set(o)},[g,t,u,m,h,_,b,s,o]}class Dt extends et{constructor(e){super(),tt(this,e,Tt,Ut,nt,{stores:7,page:8,components:0,form:1,data_0:2,data_1:3})}}const qt={},_e=[()=>Se(()=>import("./chunks/0-4dbb8d2a.js"),["./chunks/0-4dbb8d2a.js","./components/pages/_layout.svelte-cb33bec5.js","./chunks/preload-helper-b21cceae.js","./chunks/index-8bd12b80.js","./assets/_layout-732f7c28.css"],import.meta.url),()=>Se(()=>import("./chunks/1-46c21f38.js"),["./chunks/1-46c21f38.js","./components/pages/_error.svelte-91f9829d.js","./chunks/index-8bd12b80.js","./chunks/singletons-1c6cb706.js","./chunks/index-8802614f.js"],import.meta.url),()=>Se(()=>import("./chunks/2-1278a0d4.js"),["./chunks/2-1278a0d4.js","./chunks/_page-8a79ccb6.js","./components/pages/_page.svelte-6f795ed3.js","./chunks/index-8bd12b80.js","./chunks/index-8802614f.js","./assets/_page-f0e06877.css"],import.meta.url)],Ct=[],Vt={"/":[2]},Ft={handleError:({error:r})=>{console.error(r)}};class Le{constructor(e,n){this.status=e,typeof n=="string"?this.body={message:n}:n?this.body=n:this.body={message:`Error: ${e}`}}toString(){return JSON.stringify(this.body)}}class Xe{constructor(e,n){this.status=e,this.location=n}}async function Bt(r){var e;for(const n in r)if(typeof((e=r[n])==null?void 0:e.then)=="function")return Object.fromEntries(await Promise.all(Object.entries(r).map(async([s,o])=>[s,await o])));return r}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");Object.getOwnPropertyNames(Object.prototype).sort().join("\0");const Jt=-1,zt=-2,Gt=-3,Kt=-4,Mt=-5,Wt=-6;function Ht(r){if(typeof r=="number")return s(r,!0);if(!Array.isArray(r)||r.length===0)throw new Error("Invalid input");const e=r,n=Array(e.length);function s(o,g=!1){if(o===Jt)return;if(o===Gt)return NaN;if(o===Kt)return 1/0;if(o===Mt)return-1/0;if(o===Wt)return-0;if(g)throw new Error("Invalid input");if(o in n)return n[o];const t=e[o];if(!t||typeof t!="object")n[o]=t;else if(Array.isArray(t))if(typeof t[0]=="string")switch(t[0]){case"Date":n[o]=new Date(t[1]);break;case"Set":const m=new Set;n[o]=m;for(let b=1;b<t.length;b+=1)m.add(s(t[b]));break;case"Map":const h=new Map;n[o]=h;for(let b=1;b<t.length;b+=2)h.set(s(t[b]),s(t[b+1]));break;case"RegExp":n[o]=new RegExp(t[1],t[2]);break;case"Object":n[o]=Object(t[1]);break;case"BigInt":n[o]=BigInt(t[1]);break;case"null":const _=Object.create(null);n[o]=_;for(let b=1;b<t.length;b+=2)_[t[b]]=s(t[b+1]);break}else{const u=new Array(t.length);n[o]=u;for(let m=0;m<t.length;m+=1){const h=t[m];h!==zt&&(u[m]=s(h))}}else{const u={};n[o]=u;for(const m in t){const h=t[m];u[m]=s(h)}}return n[o]}return s(0)}const xe="sveltekit:scroll",F="sveltekit:index",ue=Lt(_e,Ct,Vt,qt),Ae=_e[0],Ne=_e[1];Ae();Ne();let oe={};try{oe=JSON.parse(sessionStorage[xe])}catch{}function $e(r){oe[r]=je()}function Yt({target:r,base:e,trailing_slash:n}){var ze;const s=[];let o=null;const g={before_navigate:[],after_navigate:[]};let t={branch:[],error:null,url:null},u=!1,m=!1,h=!0,_=!1,b=!1,R=!1,K=!1,N,L=(ze=history.state)==null?void 0:ze[F];L||(L=Date.now(),history.replaceState({...history.state,[F]:L},"",location.href));const C=oe[L];C&&(history.scrollRestoration="manual",scrollTo(C.x,C.y));let D,se,H;async function ie(){H=H||Promise.resolve(),await H,H=null;const a=new URL(location.href),l=be(a,!0);o=null,await Te(l,a,[])}async function ee(a,{noScroll:l=!1,replaceState:c=!1,keepFocus:i=!1,state:f={},invalidateAll:p=!1},d,v){return typeof a=="string"&&(a=new URL(a,Me(document))),ve({url:a,scroll:l?je():null,keepfocus:i,redirect_chain:d,details:{state:f,replaceState:c},nav_token:v,accepted:()=>{p&&(K=!0)},blocked:()=>{},type:"goto"})}async function Ue(a){const l=be(a,!1);if(!l)throw new Error(`Attempted to prefetch a URL that does not belong to this app: ${a}`);return o={id:l.id,promise:Ce(l).then(c=>(c.type==="loaded"&&c.state.error&&(o=null),c))},o.promise}async function Te(a,l,c,i,f={},p){var v,E;se=f;let d=a&&await Ce(a);if(d||(d=await Je(l,{id:null},re(new Error(`Not found: ${l.pathname}`),{url:l,params:{},route:{id:null}}),404)),l=(a==null?void 0:a.url)||l,se!==f)return!1;if(d.type==="redirect")if(c.length>10||c.includes(l.pathname))d=await le({status:500,error:re(new Error("Redirect loop"),{url:l,params:{},route:{id:null}}),url:l,route:{id:null}});else return ee(new URL(d.location,l).href,{},[...c,l.pathname],f),!1;else((E=(v=d.props)==null?void 0:v.page)==null?void 0:E.status)>=400&&await M.updated.check()&&await ce(l);if(s.length=0,K=!1,_=!0,i&&i.details){const{details:w}=i,y=w.replaceState?0:1;w.state[F]=L+=y,history[w.replaceState?"replaceState":"pushState"](w.state,"",l)}if(o=null,m){t=d.state,d.props.page&&(d.props.page.url=l);const w=de();N.$set(d.props),w()}else De(d);if(i){const{scroll:w,keepfocus:y}=i;if(y||Oe(),await fe(),h){const O=l.hash&&document.getElementById(l.hash.slice(1));w?scrollTo(w.x,w.y):O?O.scrollIntoView():scrollTo(0,0)}}else await fe();h=!0,d.props.page&&(D=d.props.page),p&&p(),_=!1}function De(a){var f,p;t=a.state;const l=document.querySelector("style[data-sveltekit]");l&&l.remove(),D=a.props.page;const c=de();N=new Dt({target:r,props:{...a.props,stores:M},hydrate:!0}),c();const i={from:null,to:pe("to",{params:t.params,route:{id:(p=(f=t.route)==null?void 0:f.id)!=null?p:null},url:new URL(location.href)}),willUnload:!1,type:"enter"};g.after_navigate.forEach(d=>d(i)),m=!0}async function te({url:a,params:l,branch:c,status:i,error:f,route:p,form:d}){var P;const v=c.filter(Boolean),E={type:"loaded",state:{url:a,params:l,branch:c,error:f,route:p},props:{components:v.map($=>$.node.component)}};d!==void 0&&(E.props.form=d);let w={},y=!D;for(let $=0;$<v.length;$+=1){const U=v[$];w={...w,...U.data},(y||!t.branch.some(T=>T===U))&&(E.props[`data_${$}`]=w,y=y||Object.keys((P=U.data)!=null?P:{}).length>0)}if(y||(y=Object.keys(D.data).length!==Object.keys(w).length),!t.url||a.href!==t.url.href||t.error!==f||d!==void 0||y){E.props.page={error:f,params:l,route:p,status:i,url:a,form:d,data:y?w:D.data},Object.defineProperty(E.props.page,"routeId",{get(){throw new Error("$page.routeId has been replaced by $page.route.id")},enumerable:!1});const $=(U,T)=>{Object.defineProperty(E.props.page,U,{get:()=>{throw new Error(`$page.${U} has been replaced by $page.url.${T}`)}})};$("origin","origin"),$("path","pathname"),$("query","searchParams")}return E}async function we({loader:a,parent:l,url:c,params:i,route:f,server_data_node:p}){var w,y,O,P,$;let d=null;const v={dependencies:new Set,params:new Set,parent:!1,route:!1,url:!1},E=await a();if((w=E.shared)!=null&&w.load){let U=function(...S){for(const q of S){const{href:k}=new URL(q,c);v.dependencies.add(k)}};const T={route:{get id(){return v.route=!0,f.id}},params:new Proxy(i,{get:(S,q)=>(v.params.add(q),S[q])}),data:(y=p==null?void 0:p.data)!=null?y:null,url:wt(c,()=>{v.url=!0}),async fetch(S,q){let k;S instanceof Request?(k=S.url,q={body:S.method==="GET"||S.method==="HEAD"?void 0:await S.blob(),cache:S.cache,credentials:S.credentials,headers:S.headers,integrity:S.integrity,keepalive:S.keepalive,method:S.method,mode:S.mode,redirect:S.redirect,referrer:S.referrer,referrerPolicy:S.referrerPolicy,signal:S.signal,...q}):k=S;const I=new URL(k,c).href;return U(I),m?St(k,I,q):kt(k,q)},setHeaders:()=>{},depends:U,parent(){return v.parent=!0,l()}};Object.defineProperties(T,{props:{get(){throw new Error("@migration task: Replace `props` with `data` stuff https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693")},enumerable:!1},session:{get(){throw new Error("session is no longer available. See https://github.com/sveltejs/kit/discussions/5883")},enumerable:!1},stuff:{get(){throw new Error("@migration task: Remove stuff https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693")},enumerable:!1},routeId:{get(){throw new Error("routeId has been replaced by route.id")},enumerable:!1}}),d=(O=await E.shared.load.call(null,T))!=null?O:null,d=d?await Bt(d):null}return{node:E,loader:a,server:p,shared:(P=E.shared)!=null&&P.load?{type:"data",data:d,uses:v}:null,data:($=d!=null?d:p==null?void 0:p.data)!=null?$:null}}function qe(a,l,c,i,f){if(K)return!0;if(!i)return!1;if(i.parent&&a||i.route&&l||i.url&&c)return!0;for(const p of i.params)if(f[p]!==t.params[p])return!0;for(const p of i.dependencies)if(s.some(d=>d(new URL(p))))return!0;return!1}function ye(a,l){var c,i;return(a==null?void 0:a.type)==="data"?{type:"data",data:a.data,uses:{dependencies:new Set((c=a.uses.dependencies)!=null?c:[]),params:new Set((i=a.uses.params)!=null?i:[]),parent:!!a.uses.parent,route:!!a.uses.route,url:!!a.uses.url}}:(a==null?void 0:a.type)==="skip"&&l!=null?l:null}async function Ce({id:a,invalidating:l,url:c,params:i,route:f}){var q;if((o==null?void 0:o.id)===a)return o.promise;const{errors:p,layouts:d,leaf:v}=f,E=[...d,v];p.forEach(k=>k==null?void 0:k().catch(()=>{})),E.forEach(k=>k==null?void 0:k[1]().catch(()=>{}));let w=null;const y=t.url?a!==t.url.pathname+t.url.search:!1,O=t.route?a!==t.route.id:!1,P=E.reduce((k,I,A)=>{var ne;const j=t.branch[A],Y=!!(I!=null&&I[0])&&((j==null?void 0:j.loader)!==I[1]||qe(k.some(Boolean),O,y,(ne=j.server)==null?void 0:ne.uses,i));return k.push(Y),k},[]);if(P.some(Boolean)){try{w=await Ze(c,P)}catch(k){return le({status:500,error:re(k,{url:c,params:i,route:{id:f.id}}),url:c,route:f})}if(w.type==="redirect")return w}const $=w==null?void 0:w.nodes;let U=!1;const T=E.map(async(k,I)=>{var ne;if(!k)return;const A=t.branch[I],j=$==null?void 0:$[I];if((!j||j.type==="skip")&&k[1]===(A==null?void 0:A.loader)&&!qe(U,O,y,(ne=A.shared)==null?void 0:ne.uses,i))return A;if(U=!0,(j==null?void 0:j.type)==="error")throw j;return we({loader:k[1],url:c,params:i,route:f,parent:async()=>{var Ke;const Ge={};for(let Ee=0;Ee<I;Ee+=1)Object.assign(Ge,(Ke=await T[Ee])==null?void 0:Ke.data);return Ge},server_data_node:ye(j===void 0&&k[0]?{type:"skip"}:j!=null?j:null,A==null?void 0:A.server)})});for(const k of T)k.catch(()=>{});const S=[];for(let k=0;k<E.length;k+=1)if(E[k])try{S.push(await T[k])}catch(I){if(I instanceof Xe)return{type:"redirect",location:I.location};let A=500,j;$!=null&&$.includes(I)?(A=(q=I.status)!=null?q:A,j=I.error):I instanceof Le?(A=I.status,j=I.body):j=re(I,{params:i,url:c,route:{id:f.id}});const Y=await Ve(k,S,p);return Y?await te({url:c,params:i,branch:S.slice(0,Y.idx).concat(Y.node),status:A,error:j,route:f}):await Je(c,{id:f.id},j,A)}else S.push(void 0);return await te({url:c,params:i,branch:S,status:200,error:null,route:f,form:l?void 0:null})}async function Ve(a,l,c){for(;a--;)if(c[a]){let i=a;for(;!l[i];)i-=1;try{return{idx:i+1,node:{node:await c[a](),loader:c[a],data:{},server:null,shared:null}}}catch{continue}}}async function le({status:a,error:l,url:c,route:i}){var w;const f={},p=await Ae();let d=null;if(p.server)try{const y=await Ze(c,[!0]);if(y.type!=="data"||y.nodes[0]&&y.nodes[0].type!=="data")throw 0;d=(w=y.nodes[0])!=null?w:null}catch{(c.origin!==location.origin||c.pathname!==location.pathname||u)&&await ce(c)}const v=await we({loader:Ae,url:c,params:f,route:i,parent:()=>Promise.resolve({}),server_data_node:ye(d)}),E={node:await Ne(),loader:Ne,shared:null,server:null,data:null};return await te({url:c,params:f,branch:[v,E],status:a,error:l,route:null})}function be(a,l){if(Fe(a))return;const c=mt(a.pathname.slice(e.length)||"/");for(const i of ue){const f=i.exec(c);if(f){const p=new URL(a.origin+ht(a.pathname,n)+a.search+a.hash);return{id:p.pathname+p.search,invalidating:l,route:i,params:gt(f),url:p}}}}function Fe(a){return a.origin!==location.origin||!a.pathname.startsWith(e)}function Be({url:a,type:l,intent:c,delta:i}){var v,E,w,y,O;let f=!1;const p={from:pe("from",{params:t.params,route:{id:(E=(v=t.route)==null?void 0:v.id)!=null?E:null},url:t.url}),to:pe("to",{params:(w=c==null?void 0:c.params)!=null?w:null,route:{id:(O=(y=c==null?void 0:c.route)==null?void 0:y.id)!=null?O:null},url:a}),willUnload:!c,type:l};i!==void 0&&(p.delta=i);const d={...p,cancel:()=>{f=!0}};return b||g.before_navigate.forEach(P=>P(d)),f?null:p}async function ve({url:a,scroll:l,keepfocus:c,redirect_chain:i,details:f,type:p,delta:d,nav_token:v,accepted:E,blocked:w}){const y=be(a,!1),O=Be({url:a,type:p,delta:d,intent:y});if(!O){w();return}$e(L),E(),b=!0,m&&M.navigating.set(O),await Te(y,a,i,{scroll:l,keepfocus:c,details:f},v,()=>{b=!1,g.after_navigate.forEach(P=>P(O)),M.navigating.set(null)})}async function Je(a,l,c,i){return a.origin===location.origin&&a.pathname===location.pathname&&!u?await le({status:i,error:c,url:a,route:l}):await ce(a)}function ce(a){return location.href=a.href,new Promise(()=>{})}return{after_navigate:a=>{Ie(()=>(g.after_navigate.push(a),()=>{const l=g.after_navigate.indexOf(a);g.after_navigate.splice(l,1)}))},before_navigate:a=>{Ie(()=>(g.before_navigate.push(a),()=>{const l=g.before_navigate.indexOf(a);g.before_navigate.splice(l,1)}))},disable_scroll_handling:()=>{(_||!m)&&(h=!1)},goto:(a,l={})=>{if("keepfocus"in l)throw new Error("`keepfocus` has been renamed to `keepFocus` (note the difference in casing)");if("noscroll"in l)throw new Error("`noscroll` has been renamed to `noScroll` (note the difference in casing)");return ee(a,l,[])},invalidate:a=>{if(a===void 0)throw new Error("`invalidate()` (with no arguments) has been replaced by `invalidateAll()`");if(typeof a=="function")s.push(a);else{const{href:l}=new URL(a,location.href);s.push(c=>c.href===l)}return ie()},invalidateAll:()=>(K=!0,ie()),prefetch:async a=>{const l=new URL(a,Me(document));await Ue(l)},prefetch_routes:async a=>{const c=(a?ue.filter(i=>a.some(f=>i.exec(f))):ue).map(i=>Promise.all([...i.layouts,i.leaf].map(f=>f==null?void 0:f[1]())));await Promise.all(c)},apply_action:async a=>{if(a.type==="error"){const l=new URL(location.href),{branch:c,route:i}=t;if(!i)return;const f=await Ve(t.branch.length,c,i.errors);if(f){const p=await te({url:l,params:t.params,branch:c.slice(0,f.idx).concat(f.node),status:500,error:a.error,route:i});t=p.state;const d=de();N.$set(p.props),d(),fe().then(Oe)}}else if(a.type==="redirect")ee(a.location,{invalidateAll:!0},[]);else{const l={form:a.data,page:{...D,form:a.data,status:a.status}},c=de();N.$set(l),c(),a.type==="success"&&fe().then(Oe)}},_start_router:()=>{history.scrollRestoration="manual",addEventListener("beforeunload",i=>{var p,d;let f=!1;if(!b){const v={from:pe("from",{params:t.params,route:{id:(d=(p=t.route)==null?void 0:p.id)!=null?d:null},url:t.url}),to:null,willUnload:!0,type:"leave",cancel:()=>f=!0};g.before_navigate.forEach(E=>E(v))}f?(i.preventDefault(),i.returnValue=""):history.scrollRestoration="auto"}),addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden"){$e(L);try{sessionStorage[xe]=JSON.stringify(oe)}catch{}}});const a=i=>{const{url:f,options:p,has:d}=We(i);if(f&&p.prefetch&&!Fe(f)){if(p.reload||d.rel_external||d.target||d.download)return;Ue(f)}};let l;const c=i=>{clearTimeout(l),l=setTimeout(()=>{var f;(f=i.target)==null||f.dispatchEvent(new CustomEvent("sveltekit:trigger_prefetch",{bubbles:!0}))},20)};addEventListener("touchstart",a),addEventListener("mousemove",c),addEventListener("sveltekit:trigger_prefetch",a),addEventListener("click",i=>{if(i.button||i.which!==1||i.metaKey||i.ctrlKey||i.shiftKey||i.altKey||i.defaultPrevented)return;const{a:f,url:p,options:d,has:v}=We(i);if(!f||!p||!(f instanceof SVGAElement)&&p.protocol!==location.protocol&&!(p.protocol==="https:"||p.protocol==="http:")||v.download)return;if(d.reload||v.rel_external||v.target){Be({url:p,type:"link"})||i.preventDefault(),b=!0;return}const[w,y]=p.href.split("#");if(y!==void 0&&w===location.href.split("#")[0]){R=!0,$e(L),t.url=p,M.page.set({...D,url:p}),M.page.notify();return}ve({url:p,scroll:d.noscroll?je():null,keepfocus:!1,redirect_chain:[],details:{state:{},replaceState:p.href===location.href},accepted:()=>i.preventDefault(),blocked:()=>i.preventDefault(),type:"link"})}),addEventListener("popstate",i=>{if(i.state){if(i.state[F]===L)return;const f=i.state[F]-L;ve({url:new URL(location.href),scroll:oe[i.state[F]],keepfocus:!1,redirect_chain:[],details:null,accepted:()=>{L=i.state[F]},blocked:()=>{history.go(-f)},type:"popstate",delta:f})}}),addEventListener("hashchange",()=>{R&&(R=!1,history.replaceState({...history.state,[F]:++L},"",location.href))});for(const i of document.querySelectorAll("link"))i.rel==="icon"&&(i.href=i.href);addEventListener("pageshow",i=>{i.persisted&&M.navigating.set(null)})},_hydrate:async({status:a,error:l,node_ids:c,params:i,route:f,data:p,form:d})=>{var w;u=!0;const v=new URL(location.href);let E;try{const y=c.map(async(O,P)=>{const $=p[P];return we({loader:_e[O],url:v,params:i,route:f,parent:async()=>{const U={};for(let T=0;T<P;T+=1)Object.assign(U,(await y[T]).data);return U},server_data_node:ye($)})});E=await te({url:v,params:i,branch:await Promise.all(y),status:a,error:l,form:d,route:(w=ue.find(({id:O})=>O===f.id))!=null?w:null})}catch(y){if(y instanceof Xe){await ce(new URL(y.location,location.href));return}E=await le({status:y instanceof Le?y.status:500,error:re(y,{url:v,params:i,route:f}),url:v,route:f})}De(E)}}}async function Ze(r,e){var g;const n=new URL(r);n.pathname=vt(r.pathname);const s=await ge(n.href,{headers:{"x-sveltekit-invalidated":e.map(t=>t?"1":"").join(",")}}),o=await s.json();if(!s.ok)throw new Error(o);return(g=o.nodes)==null||g.forEach(t=>{var u,m;(t==null?void 0:t.type)==="data"&&(t.data=Ht(t.data),t.uses={dependencies:new Set((u=t.uses.dependencies)!=null?u:[]),params:new Set((m=t.uses.params)!=null?m:[]),parent:!!t.uses.parent,route:!!t.uses.route,url:!!t.uses.url})}),o}function re(r,e){var n;return r instanceof Le?r.body:(n=Ft.handleError({error:r,event:e}))!=null?n:{message:e.route.id!=null?"Internal Error":"Not Found"}}const Xt=["hash","href","host","hostname","origin","pathname","port","protocol","search","searchParams","toString","toJSON"];function pe(r,e){for(const n of Xt)Object.defineProperty(e,n,{get(){throw new Error(`The navigation shape changed - ${r}.${n} should now be ${r}.url.${n}`)},enumerable:!1});return Object.defineProperty(e,"routeId",{get(){throw new Error(`The navigation shape changed - ${r}.routeId should now be ${r}.route.id`)},enumerable:!1}),e}function de(){return()=>{}}function Oe(){const r=document.querySelector("[autofocus]");if(r)r.focus();else{const e=document.body,n=e.getAttribute("tabindex");e.tabIndex=-1,e.focus({preventScroll:!0}),setTimeout(()=>{var s;(s=getSelection())==null||s.removeAllRanges()}),n!==null?e.setAttribute("tabindex",n):e.removeAttribute("tabindex")}}async function en({env:r,hydrate:e,paths:n,target:s,trailing_slash:o}){pt(n);const g=Yt({target:s,base:n.base,trailing_slash:o});dt({client:g}),e?await g._hydrate(e):g.goto(location.href,{replaceState:!0}),g._start_router()}export{en as start};
