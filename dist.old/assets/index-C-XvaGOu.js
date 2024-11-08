(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function r(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=r(o);fetch(o.href,s)}})();const _n=!1;var _r=Array.isArray,Tt=Array.from,hn=Object.defineProperty,Ut=Object.getOwnPropertyDescriptor,hr=Object.getOwnPropertyDescriptors,dt=Object.getPrototypeOf;function gn(e){return e()}function vt(e){for(var t=0;t<e.length;t++)e[t]()}const te=2,gr=4,ze=8,Ct=16,Q=32,tt=64,pe=128,Qe=256,R=512,le=1024,Ne=2048,ee=4096,Be=8192,yn=16384,xt=32768,wn=1<<18,yr=1<<19,Yt=Symbol("$state"),mn=Symbol("");function wr(e){return e===this.v}function bn(e,t){return e!=e?t==t:e!==t||e!==null&&typeof e=="object"||typeof e=="function"}function mr(e){return!bn(e,this.v)}function En(e){throw new Error("effect_in_teardown")}function Dn(){throw new Error("effect_in_unowned_derived")}function In(e){throw new Error("effect_orphan")}function Sn(){throw new Error("effect_update_depth_exceeded")}function Tn(){throw new Error("state_unsafe_local_read")}function Cn(){throw new Error("state_unsafe_mutation")}function Xe(e){return{f:0,v:e,reactions:null,equals:wr,version:0}}function br(e,t=!1){var n;const r=Xe(e);return t||(r.equals=mr),T!==null&&T.l!==null&&((n=T.l).s??(n.s=[])).push(r),r}function z(e,t=!1){return xn(br(e,t))}function xn(e){return D!==null&&D.f&te&&(J===null?jn([e]):J.push(e)),e}function u(e,t){return D!==null&&rt()&&D.f&(te|Ct)&&(J===null||!J.includes(e))&&Cn(),pt(e,t)}function pt(e,t){return e.equals(t)||(e.v=t,e.version=Kr(),Er(e,le),rt()&&b!==null&&b.f&R&&!(b.f&Q)&&(N!==null&&N.includes(e)?(X(b,le),ot(b)):ae===null?Vn([e]):ae.push(e))),t}function Er(e,t){var r=e.reactions;if(r!==null)for(var n=rt(),o=r.length,s=0;s<o;s++){var i=r[s],c=i.f;c&le||!n&&i===b||(X(i,t),c&(R|pe)&&(c&te?Er(i,Ne):ot(i)))}}const kt=1,Lt=2,Dr=4,kn=8,Ln=16,On=2;let Ir=!1;var Jt,Sr,Tr;function Pn(){if(Jt===void 0){Jt=window;var e=Element.prototype,t=Node.prototype;Sr=Ut(t,"firstChild").get,Tr=Ut(t,"nextSibling").get,e.__click=void 0,e.__className="",e.__attributes=null,e.__styles=null,e.__e=void 0,Text.prototype.__t=void 0}}function Cr(e=""){return document.createTextNode(e)}function xr(e){return Sr.call(e)}function Ot(e){return Tr.call(e)}function I(e,t){return xr(e)}function E(e,t=1,r=!1){let n=e;for(;t--;)n=Ot(n);return n}function An(e){e.textContent=""}function kr(e){var t=te|le;b===null?t|=pe:b.f|=yr;const r={children:null,ctx:T,deps:null,equals:wr,f:t,fn:e,reactions:null,v:null,version:0,parent:b};if(D!==null&&D.f&te){var n=D;(n.children??(n.children=[])).push(r)}return r}function zn(e){const t=kr(e);return t.equals=mr,t}function Lr(e){var t=e.children;if(t!==null){e.children=null;for(var r=0;r<t.length;r+=1){var n=t[r];n.f&te?Pt(n):_e(n)}}}function Or(e){var t,r=b;ce(e.parent);try{Lr(e),t=Hr(e)}finally{ce(r)}return t}function Pr(e){var t=Or(e),r=(me||e.f&pe)&&e.deps!==null?Ne:R;X(e,r),e.equals(t)||(e.v=t,e.version=Kr())}function Pt(e){Lr(e),Ae(e,0),X(e,Be),e.v=e.children=e.deps=e.ctx=e.reactions=null}function Ar(e){b===null&&D===null&&In(),D!==null&&D.f&pe&&Dn(),Nt&&En()}function Nn(e,t){var r=t.last;r===null?t.last=t.first=e:(r.next=e,e.prev=r,t.last=e)}function Ee(e,t,r,n=!0){var o=(e&tt)!==0,s=b,i={ctx:T,deps:null,deriveds:null,nodes_start:null,nodes_end:null,f:e|le,first:null,fn:t,last:null,next:null,parent:o?null:s,prev:null,teardown:null,transitions:null,version:0};if(r){var c=be;try{Qt(!0),nt(i),i.f|=yn}catch(y){throw _e(i),y}finally{Qt(c)}}else t!==null&&ot(i);var d=r&&i.deps===null&&i.first===null&&i.nodes_start===null&&i.teardown===null&&(i.f&yr)===0;if(!d&&!o&&n&&(s!==null&&Nn(i,s),D!==null&&D.f&te)){var p=D;(p.children??(p.children=[])).push(i)}return i}function Bn(e){const t=Ee(ze,null,!1);return X(t,R),t.teardown=e,t}function _t(e){Ar();var t=b!==null&&(b.f&Q)!==0&&T!==null&&!T.m;if(t){var r=T;(r.e??(r.e=[])).push({fn:e,effect:b,reaction:D})}else{var n=zr(e);return n}}function Mn(e){return Ar(),Nr(e)}function Fn(e){const t=Ee(tt,e,!0);return()=>{_e(t)}}function zr(e){return Ee(gr,e,!1)}function Nr(e){return Ee(ze,e,!0)}function U(e){return At(e)}function At(e,t=0){return Ee(ze|Ct|t,e,!0)}function Pe(e,t=!0){return Ee(ze|Q,e,!0,t)}function Br(e){var t=e.teardown;if(t!==null){const r=Nt,n=D;Xt(!0),ue(null);try{t.call(null)}finally{Xt(r),ue(n)}}}function Mr(e){var t=e.deriveds;if(t!==null){e.deriveds=null;for(var r=0;r<t.length;r+=1)Pt(t[r])}}function Fr(e,t=!1){var r=e.first;for(e.first=e.last=null;r!==null;){var n=r.next;_e(r,t),r=n}}function qn(e){for(var t=e.first;t!==null;){var r=t.next;t.f&Q||_e(t),t=r}}function _e(e,t=!0){var r=!1;if((t||e.f&wn)&&e.nodes_start!==null){for(var n=e.nodes_start,o=e.nodes_end;n!==null;){var s=n===o?null:Ot(n);n.remove(),n=s}r=!0}Fr(e,t&&!r),Mr(e),Ae(e,0),X(e,Be);var i=e.transitions;if(i!==null)for(const d of i)d.stop();Br(e);var c=e.parent;c!==null&&c.first!==null&&qr(e),e.next=e.prev=e.teardown=e.ctx=e.deps=e.parent=e.fn=e.nodes_start=e.nodes_end=null}function qr(e){var t=e.parent,r=e.prev,n=e.next;r!==null&&(r.next=n),n!==null&&(n.prev=r),t!==null&&(t.first===e&&(t.first=n),t.last===e&&(t.last=r))}function ht(e,t){var r=[];zt(e,r,!0),Rr(r,()=>{_e(e),t&&t()})}function Rr(e,t){var r=e.length;if(r>0){var n=()=>--r||t();for(var o of e)o.out(n)}else t()}function zt(e,t,r){if(!(e.f&ee)){if(e.f^=ee,e.transitions!==null)for(const i of e.transitions)(i.is_global||r)&&t.push(i);for(var n=e.first;n!==null;){var o=n.next,s=(n.f&xt)!==0||(n.f&Q)!==0;zt(n,t,s?r:!1),n=o}}}function Ze(e){jr(e,!0)}function jr(e,t){if(e.f&ee){e.f^=ee,Me(e)&&nt(e);for(var r=e.first;r!==null;){var n=r.next,o=(r.f&xt)!==0||(r.f&Q)!==0;jr(r,o?t:!1),r=n}if(e.transitions!==null)for(const s of e.transitions)(s.is_global||t)&&s.in()}}let gt=!1,yt=[];function Rn(){gt=!1;const e=yt.slice();yt=[],vt(e)}function Vr(e){gt||(gt=!0,queueMicrotask(Rn)),yt.push(e)}function $r(e){throw new Error("lifecycle_outside_component")}let et=!1,be=!1,Nt=!1;function Qt(e){be=e}function Xt(e){Nt=e}let wt=[],Oe=0;let D=null;function ue(e){D=e}let b=null;function ce(e){b=e}let J=null;function jn(e){J=e}let N=null,V=0,ae=null;function Vn(e){ae=e}let Wr=0,me=!1,T=null;function Kr(){return++Wr}function rt(){return T!==null&&T.l===null}function Me(e){var i,c;var t=e.f;if(t&le)return!0;if(t&Ne){var r=e.deps,n=(t&pe)!==0;if(r!==null){var o;if(t&Qe){for(o=0;o<r.length;o++)((i=r[o]).reactions??(i.reactions=[])).push(e);e.f^=Qe}for(o=0;o<r.length;o++){var s=r[o];if(Me(s)&&Pr(s),n&&b!==null&&!me&&!((c=s==null?void 0:s.reactions)!=null&&c.includes(e))&&(s.reactions??(s.reactions=[])).push(e),s.version>e.version)return!0}}n||X(e,R)}return!1}function $n(e,t,r){throw e}function Hr(e){var v;var t=N,r=V,n=ae,o=D,s=me,i=J,c=T,d=e.f;N=null,V=0,ae=null,D=d&(Q|tt)?null:e,me=!be&&(d&pe)!==0,J=null,T=e.ctx;try{var p=(0,e.fn)(),y=e.deps;if(N!==null){var f;if(Ae(e,V),y!==null&&V>0)for(y.length=V+N.length,f=0;f<N.length;f++)y[V+f]=N[f];else e.deps=y=N;if(!me)for(f=V;f<y.length;f++)((v=y[f]).reactions??(v.reactions=[])).push(e)}else y!==null&&V<y.length&&(Ae(e,V),y.length=V);return p}finally{N=t,V=r,ae=n,D=o,me=s,J=i,T=c}}function Wn(e,t){let r=t.reactions;if(r!==null){var n=r.indexOf(e);if(n!==-1){var o=r.length-1;o===0?r=t.reactions=null:(r[n]=r[o],r.pop())}}r===null&&t.f&te&&(N===null||!N.includes(t))&&(X(t,Ne),t.f&(pe|Qe)||(t.f^=Qe),Ae(t,0))}function Ae(e,t){var r=e.deps;if(r!==null)for(var n=t;n<r.length;n++)Wn(e,r[n])}function nt(e){var t=e.f;if(!(t&Be)){X(e,R);var r=b;b=e;try{t&Ct?qn(e):Fr(e),Mr(e),Br(e);var n=Hr(e);e.teardown=typeof n=="function"?n:null,e.version=Wr}catch(o){$n(o)}finally{b=r}}}function Kn(){Oe>1e3&&(Oe=0,Sn()),Oe++}function Hn(e){var t=e.length;if(t!==0){Kn();var r=be;be=!0;try{for(var n=0;n<t;n++){var o=e[n];o.f&R||(o.f^=R);var s=[];Gr(o,s),Gn(s)}}finally{be=r}}}function Gn(e){var t=e.length;if(t!==0)for(var r=0;r<t;r++){var n=e[r];!(n.f&(Be|ee))&&Me(n)&&(nt(n),n.deps===null&&n.first===null&&n.nodes_start===null&&(n.teardown===null?qr(n):n.fn=null))}}function Un(){if(et=!1,Oe>1001)return;const e=wt;wt=[],Hn(e),et||(Oe=0)}function ot(e){et||(et=!0,queueMicrotask(Un));for(var t=e;t.parent!==null;){t=t.parent;var r=t.f;if(r&(tt|Q)){if(!(r&R))return;t.f^=R}}wt.push(t)}function Gr(e,t){var r=e.first,n=[];e:for(;r!==null;){var o=r.f,s=(o&Q)!==0,i=s&&(o&R)!==0;if(!i&&!(o&ee))if(o&ze){s?r.f^=R:Me(r)&&nt(r);var c=r.first;if(c!==null){r=c;continue}}else o&gr&&n.push(r);var d=r.next;if(d===null){let f=r.parent;for(;f!==null;){if(e===f)break e;var p=f.next;if(p!==null){r=p;continue e}f=f.parent}}r=d}for(var y=0;y<n.length;y++)c=n[y],t.push(c),Gr(c,t)}function a(e){var c;var t=e.f,r=(t&te)!==0;if(r&&t&Be){var n=Or(e);return Pt(e),n}if(D!==null){J!==null&&J.includes(e)&&Tn();var o=D.deps;N===null&&o!==null&&o[V]===e?V++:N===null?N=[e]:N.push(e),ae!==null&&b!==null&&b.f&R&&!(b.f&Q)&&ae.includes(e)&&(X(b,le),ot(b))}else if(r&&e.deps===null){var s=e,i=s.parent;i!==null&&!((c=i.deriveds)!=null&&c.includes(s))&&(i.deriveds??(i.deriveds=[])).push(s)}return r&&(s=e,Me(s)&&Pr(s)),e.v}function Bt(e){const t=D;try{return D=null,e()}finally{D=t}}const Yn=~(le|Ne|R);function X(e,t){e.f=e.f&Yn|t}function Ur(e,t=!1,r){T={p:T,c:null,e:null,m:!1,s:e,x:null,l:null},t||(T.l={s:null,u:null,r1:[],r2:Xe(!1)})}function Yr(e){const t=T;if(t!==null){const i=t.e;if(i!==null){var r=b,n=D;t.e=null;try{for(var o=0;o<i.length;o++){var s=i[o];ce(s.effect),ue(s.reaction),zr(s.fn)}}finally{ce(r),ue(n)}}T=t.p,t.m=!0}return{}}function Jn(e){if(!(typeof e!="object"||!e||e instanceof EventTarget)){if(Yt in e)mt(e);else if(!Array.isArray(e))for(let t in e){const r=e[t];typeof r=="object"&&r&&Yt in r&&mt(r)}}}function mt(e,t=new Set){if(typeof e=="object"&&e!==null&&!(e instanceof EventTarget)&&!t.has(e)){t.add(e),e instanceof Date&&e.getTime();for(let n in e)try{mt(e[n],t)}catch{}const r=dt(e);if(r!==Object.prototype&&r!==Array.prototype&&r!==Map.prototype&&r!==Set.prototype&&r!==Date.prototype){const n=hr(r);for(let o in n){const s=n[o].get;if(s)try{s.call(e)}catch{}}}}}const Qn=new Set,Zt=new Set;function Xn(e,t,r,n){function o(s){if(n.capture||Le.call(t,s),!s.cancelBubble){var i=D,c=b;ue(null),ce(null);try{return r.call(this,s)}finally{ue(i),ce(c)}}}return e.startsWith("pointer")||e.startsWith("touch")||e==="wheel"?Vr(()=>{t.addEventListener(e,o,n)}):t.addEventListener(e,o,n),o}function O(e,t,r,n,o){var s={capture:n,passive:o},i=Xn(e,t,r,s);(t===document.body||t===window||t===document)&&Bn(()=>{t.removeEventListener(e,i,s)})}function Le(e){var B;var t=this,r=t.ownerDocument,n=e.type,o=((B=e.composedPath)==null?void 0:B.call(e))||[],s=o[0]||e.target,i=0,c=e.__root;if(c){var d=o.indexOf(c);if(d!==-1&&(t===document||t===window)){e.__root=t;return}var p=o.indexOf(t);if(p===-1)return;d<=p&&(i=d)}if(s=o[i]||e.target,s!==t){hn(e,"currentTarget",{configurable:!0,get(){return s||r}});var y=D,f=b;ue(null),ce(null);try{for(var v,g=[];s!==null;){var m=s.assignedSlot||s.parentNode||s.host||null;try{var x=s["__"+n];if(x!==void 0&&!s.disabled)if(_r(x)){var[$,...j]=x;$.apply(s,[e,...j])}else x.call(s,e)}catch(w){v?g.push(w):v=w}if(e.cancelBubble||m===t||m===null)break;s=m}if(v){for(let w of g)queueMicrotask(()=>{throw w});throw v}}finally{e.__root=t,delete e.currentTarget,ue(y),ce(f)}}}function Zn(e){var t=document.createElement("template");return t.innerHTML=e,t.content}function eo(e,t){var r=b;r.nodes_start===null&&(r.nodes_start=e,r.nodes_end=t)}function A(e,t){var r=(t&On)!==0,n,o=!e.startsWith("<!>");return()=>{n===void 0&&(n=Zn(o?e:"<!>"+e),n=xr(n));var s=r?document.importNode(n,!0):n.cloneNode(!0);return eo(s,s),s}}function P(e,t){e!==null&&e.before(t)}const to=["touchstart","touchmove"];function ro(e){return to.includes(e)}function Z(e,t){var r=t==null?"":typeof t=="object"?t+"":t;r!==(e.__t??(e.__t=e.nodeValue))&&(e.__t=r,e.nodeValue=r==null?"":r+"")}function no(e,t){return oo(e,t)}const ge=new Map;function oo(e,{target:t,anchor:r,props:n={},events:o,context:s,intro:i=!0}){Pn();var c=new Set,d=f=>{for(var v=0;v<f.length;v++){var g=f[v];if(!c.has(g)){c.add(g);var m=ro(g);t.addEventListener(g,Le,{passive:m});var x=ge.get(g);x===void 0?(document.addEventListener(g,Le,{passive:m}),ge.set(g,1)):ge.set(g,x+1)}}};d(Tt(Qn)),Zt.add(d);var p=void 0,y=Fn(()=>{var f=r??t.appendChild(Cr());return Pe(()=>{if(s){Ur({});var v=T;v.c=s}o&&(n.$$events=o),p=e(f,n)||{},s&&Yr()}),()=>{var m;for(var v of c){t.removeEventListener(v,Le);var g=ge.get(v);--g===0?(document.removeEventListener(v,Le),ge.delete(v)):ge.set(v,g)}Zt.delete(d),er.delete(p),f!==r&&((m=f.parentNode)==null||m.removeChild(f))}});return er.set(p,y),p}let er=new WeakMap;function W(e,t,r,n=null,o=!1){var s=e,i=null,c=null,d=null,p=o?xt:0;At(()=>{d!==(d=!!t())&&(d?(i?Ze(i):i=Pe(()=>r(s)),c&&ht(c,()=>{c=null})):(c?Ze(c):n&&(c=Pe(()=>n(s))),i&&ht(i,()=>{i=null})))},p)}let ut=null;function ye(e,t){return t}function so(e,t,r,n){for(var o=[],s=t.length,i=0;i<s;i++)zt(t[i].e,o,!0);var c=s>0&&o.length===0&&r!==null;if(c){var d=r.parentNode;An(d),d.append(r),n.clear(),ie(e,t[0].prev,t[s-1].next)}Rr(o,()=>{for(var p=0;p<s;p++){var y=t[p];c||(n.delete(y.k),ie(e,y.prev,y.next)),_e(y.e,!c)}})}function we(e,t,r,n,o,s=null){var i=e,c={flags:t,items:new Map,first:null},d=(t&Dr)!==0;if(d){var p=e;i=p.appendChild(Cr())}var y=null,f=!1;At(()=>{var v=r(),g=_r(v)?v:v==null?[]:Tt(v),m=g.length;f&&m===0||(f=m===0,io(g,c,i,o,t,n),s!==null&&(m===0?y?Ze(y):y=Pe(()=>s(i)):y!==null&&ht(y,()=>{y=null})),r())})}function io(e,t,r,n,o,s){var Fe,qe,Re,je;var i=(o&kn)!==0,c=(o&(kt|Lt))!==0,d=e.length,p=t.items,y=t.first,f=y,v,g=null,m,x=[],$=[],j,B,w,S;if(i)for(S=0;S<d;S+=1)j=e[S],B=s(j,S),w=p.get(B),w!==void 0&&((Fe=w.a)==null||Fe.measure(),(m??(m=new Set)).add(w));for(S=0;S<d;S+=1){if(j=e[S],B=s(j,S),w=p.get(B),w===void 0){var fe=f?f.e.nodes_start:r;g=lo(fe,t,g,g===null?t.first:g.next,j,B,S,n,o),p.set(B,g),x=[],$=[],f=g.next;continue}if(c&&ao(w,j,S,o),w.e.f&ee&&(Ze(w.e),i&&((qe=w.a)==null||qe.unfix(),(m??(m=new Set)).delete(w))),w!==f){if(v!==void 0&&v.has(w)){if(x.length<$.length){var re=$[0],K;g=re.prev;var ne=x[0],De=x[x.length-1];for(K=0;K<x.length;K+=1)tr(x[K],re,r);for(K=0;K<$.length;K+=1)v.delete($[K]);ie(t,ne.prev,De.next),ie(t,g,ne),ie(t,De,re),f=re,g=De,S-=1,x=[],$=[]}else v.delete(w),tr(w,f,r),ie(t,w.prev,w.next),ie(t,w,g===null?t.first:g.next),ie(t,g,w),g=w;continue}for(x=[],$=[];f!==null&&f.k!==B;)f.e.f&ee||(v??(v=new Set)).add(f),$.push(f),f=f.next;if(f===null)continue;w=f}x.push(w),g=w,f=w.next}if(f!==null||v!==void 0){for(var oe=v===void 0?[]:Tt(v);f!==null;)f.e.f&ee||oe.push(f),f=f.next;var Ie=oe.length;if(Ie>0){var it=o&Dr&&d===0?r:null;if(i){for(S=0;S<Ie;S+=1)(Re=oe[S].a)==null||Re.measure();for(S=0;S<Ie;S+=1)(je=oe[S].a)==null||je.fix()}so(t,oe,it,p)}}i&&Vr(()=>{var Ve;if(m!==void 0)for(w of m)(Ve=w.a)==null||Ve.apply()}),b.first=t.first&&t.first.e,b.last=g&&g.e}function ao(e,t,r,n){n&kt&&pt(e.v,t),n&Lt?pt(e.i,r):e.i=r}function lo(e,t,r,n,o,s,i,c,d){var p=ut;try{var y=(d&kt)!==0,f=(d&Ln)===0,v=y?f?br(o):Xe(o):o,g=d&Lt?Xe(i):i,m={i:g,v,k:s,a:null,e:null,prev:r,next:n};return ut=m,m.e=Pe(()=>c(e,v,g),Ir),m.e.prev=r&&r.e,m.e.next=n&&n.e,r===null?t.first=m:(r.next=m,r.e.next=m.e),n!==null&&(n.prev=m,n.e.prev=m.e),m}finally{ut=p}}function tr(e,t,r){for(var n=e.next?e.next.e.nodes_start:r,o=t?t.e.nodes_start:r,s=e.e.nodes_start;s!==n;){var i=Ot(s);o.before(s),s=i}}function ie(e,t,r){t===null?e.first=r:(t.next=r,t.e.next=r&&r.e),r!==null&&(r.prev=t,r.e.prev=t&&t.e)}let rr=!1;function uo(){rr||(rr=!0,document.addEventListener("reset",e=>{Promise.resolve().then(()=>{var t;if(!e.defaultPrevented)for(const r of e.target.elements)(t=r.__on_r)==null||t.call(r)})},{capture:!0}))}function nr(e,t,r,n){var o=e.__attributes??(e.__attributes={});o[t]!==(o[t]=r)&&(t==="style"&&"__styles"in e&&(e.__styles={}),t==="loading"&&(e[mn]=r),r==null?e.removeAttribute(t):typeof r!="string"&&co(e).includes(t)?e[t]=r:e.setAttribute(t,r))}var or=new Map;function co(e){var t=or.get(e.nodeName);if(t)return t;or.set(e.nodeName,t=[]);for(var r,n=dt(e),o=Element.prototype;o!==n;){r=hr(n);for(var s in r)r[s].set&&t.push(s);n=dt(n)}return t}function sr(e,t){var r=e.__className,n=fo(t);(r!==n||Ir)&&(t==null?e.removeAttribute("class"):e.className=n,e.__className=n)}function fo(e){return e??""}function vo(e,t,r){if(r){if(e.classList.contains(t))return;e.classList.add(t)}else{if(!e.classList.contains(t))return;e.classList.remove(t)}}function po(e,t,r,n=r){e.addEventListener(t,r);const o=e.__on_r;o?e.__on_r=()=>{o(),n()}:e.__on_r=n,uo()}function ke(e,t,r=t){var n=rt();po(e,"input",()=>{var o=ir(e)?ar(e.value):e.value;r(o),n&&o!==(o=t())&&(e.value=o??"")}),Nr(()=>{var o=t();ir(e)&&o===ar(e.value)||e.type==="date"&&!o&&!e.value||o!==e.value&&(e.value=o??"")})}function ir(e){var t=e.type;return t==="number"||t==="range"}function ar(e){return e===""?null:+e}function _o(e=!1){const t=T,r=t.l.u;if(!r)return;let n=()=>Jn(t.s);if(e){let o=0,s={};const i=kr(()=>{let c=!1;const d=t.s;for(const p in d)d[p]!==s[p]&&(s[p]=d[p],c=!0);return c&&o++,o});n=()=>a(i)}r.b.length&&Mn(()=>{lr(t,n),vt(r.b)}),_t(()=>{const o=Bt(()=>r.m.map(gn));return()=>{for(const s of o)typeof s=="function"&&s()}}),r.a.length&&_t(()=>{lr(t,n),vt(r.a)})}function lr(e,t){if(e.l.s)for(const r of e.l.s)a(r);t()}function Je(e){T===null&&$r(),T.l!==null?ho(T).m.push(e):_t(()=>{const t=Bt(e);if(typeof t=="function")return t})}function ur(e){T===null&&$r(),Je(()=>()=>Bt(e))}function ho(e){var t=e.l;return t.u??(t.u={a:[],b:[],m:[]})}const go="5";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(go);const bt=(e,t)=>t.some(r=>e instanceof r);let cr,fr;function yo(){return cr||(cr=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function wo(){return fr||(fr=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Et=new WeakMap,ct=new WeakMap,st=new WeakMap;function mo(e){const t=new Promise((r,n)=>{const o=()=>{e.removeEventListener("success",s),e.removeEventListener("error",i)},s=()=>{r(ve(e.result)),o()},i=()=>{n(e.error),o()};e.addEventListener("success",s),e.addEventListener("error",i)});return st.set(t,e),t}function bo(e){if(Et.has(e))return;const t=new Promise((r,n)=>{const o=()=>{e.removeEventListener("complete",s),e.removeEventListener("error",i),e.removeEventListener("abort",i)},s=()=>{r(),o()},i=()=>{n(e.error||new DOMException("AbortError","AbortError")),o()};e.addEventListener("complete",s),e.addEventListener("error",i),e.addEventListener("abort",i)});Et.set(e,t)}let Dt={get(e,t,r){if(e instanceof IDBTransaction){if(t==="done")return Et.get(e);if(t==="store")return r.objectStoreNames[1]?void 0:r.objectStore(r.objectStoreNames[0])}return ve(e[t])},set(e,t,r){return e[t]=r,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function Jr(e){Dt=e(Dt)}function Eo(e){return wo().includes(e)?function(...t){return e.apply(It(this),t),ve(this.request)}:function(...t){return ve(e.apply(It(this),t))}}function Do(e){return typeof e=="function"?Eo(e):(e instanceof IDBTransaction&&bo(e),bt(e,yo())?new Proxy(e,Dt):e)}function ve(e){if(e instanceof IDBRequest)return mo(e);if(ct.has(e))return ct.get(e);const t=Do(e);return t!==e&&(ct.set(e,t),st.set(t,e)),t}const It=e=>st.get(e);function Io(e,t,{blocked:r,upgrade:n,blocking:o,terminated:s}={}){const i=indexedDB.open(e,t),c=ve(i);return n&&i.addEventListener("upgradeneeded",d=>{n(ve(i.result),d.oldVersion,d.newVersion,ve(i.transaction),d)}),r&&i.addEventListener("blocked",d=>r(d.oldVersion,d.newVersion,d)),c.then(d=>{s&&d.addEventListener("close",()=>s()),o&&d.addEventListener("versionchange",p=>o(p.oldVersion,p.newVersion,p))}).catch(()=>{}),c}const So=["get","getKey","getAll","getAllKeys","count"],To=["put","add","delete","clear"],ft=new Map;function dr(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(ft.get(t))return ft.get(t);const r=t.replace(/FromIndex$/,""),n=t!==r,o=To.includes(r);if(!(r in(n?IDBIndex:IDBObjectStore).prototype)||!(o||So.includes(r)))return;const s=async function(i,...c){const d=this.transaction(i,o?"readwrite":"readonly");let p=d.store;return n&&(p=p.index(c.shift())),(await Promise.all([p[r](...c),o&&d.done]))[0]};return ft.set(t,s),s}Jr(e=>({...e,get:(t,r,n)=>dr(t,r)||e.get(t,r,n),has:(t,r)=>!!dr(t,r)||e.has(t,r)}));const Co=["continue","continuePrimaryKey","advance"],vr={},St=new WeakMap,Qr=new WeakMap,xo={get(e,t){if(!Co.includes(t))return e[t];let r=vr[t];return r||(r=vr[t]=function(...n){St.set(this,Qr.get(this)[t](...n))}),r}};async function*ko(...e){let t=this;if(t instanceof IDBCursor||(t=await t.openCursor(...e)),!t)return;t=t;const r=new Proxy(t,xo);for(Qr.set(r,t),st.set(r,It(t));t;)yield r,t=await(St.get(r)||t.continue()),St.delete(r)}function pr(e,t){return t===Symbol.asyncIterator&&bt(e,[IDBIndex,IDBObjectStore,IDBCursor])||t==="iterate"&&bt(e,[IDBIndex,IDBObjectStore])}Jr(e=>({...e,get(t,r,n){return pr(t,r)?ko:e.get(t,r,n)},has(t,r){return pr(t,r)||e.has(t,r)}}));var Lo=A('<div class="notification svelte-p4z19o">Item added to purchased list!</div>'),Oo=A('<button class="plus-button svelte-p4z19o">+</button>'),Po=A('<button type="button" class="clear-btn svelte-p4z19o">✕</button>'),Ao=A('<li class="svelte-p4z19o"><button type="button" class="svelte-p4z19o"> </button></li>'),zo=A('<ul class="dropdown svelte-p4z19o"></ul>'),No=A('<button type="button" class="clear-btn svelte-p4z19o">✕</button>'),Bo=A('<li class="svelte-p4z19o"><button type="button" class="svelte-p4z19o"> </button></li>'),Mo=A('<ul class="dropdown svelte-p4z19o"></ul>'),Fo=A('<button class="svelte-p4z19o">Add to Purchased List</button>'),qo=A("<button> </button>"),Ro=A('<div class="calculator-row svelte-p4z19o"></div>'),jo=A('<div class="calculator svelte-p4z19o"><div class="calculator-grid svelte-p4z19o"><!> <div class="calculator-row full-row svelte-p4z19o"><button class="calc-button delete svelte-p4z19o">⌫</button> <button class="calc-button action-button svelte-p4z19o">OK</button></div></div></div>'),Vo=A('<div class="input-section svelte-p4z19o"><div class="input-wrapper svelte-p4z19o"><label for="item-name" class="svelte-p4z19o">Item Name:</label> <input type="text" id="item-name" placeholder="Type to search or add item" autocomplete="off" class="svelte-p4z19o"> <!> <!></div> <div class="input-wrapper svelte-p4z19o"><label for="category" class="svelte-p4z19o">Category:</label> <input type="text" id="category" placeholder="Select or type category" autocomplete="off" class="svelte-p4z19o"> <!> <!></div> <div class="input-row svelte-p4z19o"><div class="input-wrapper svelte-p4z19o" style="width: 65%;"><label for="price" class="svelte-p4z19o">Price:</label> <input type="tel" id="price" readonly="" class="svelte-p4z19o"></div> <div class="input-wrapper svelte-p4z19o" style="width: 30%; margin-left: auto;"><label for="quantity" class="svelte-p4z19o">Quantity:</label> <input type="number" id="quantity" min="1" class="svelte-p4z19o"></div></div> <div class="input-wrapper svelte-p4z19o"><label for="date" class="svelte-p4z19o">Purchase Date:</label> <input type="date" id="date" class="svelte-p4z19o"></div> <!> <!></div>'),$o=A('<div class="refresh-message svelte-p4z19o"> </div>'),Wo=A('<span class="quantity-box svelte-p4z19o"> </span>'),Ko=A('<button class="delete-btn svelte-p4z19o">🗑️</button>'),Ho=A('<div role="button" tabindex="0"><div class="item-content svelte-p4z19o"><span class="item-number svelte-p4z19o"></span> <span class="item-details svelte-p4z19o"> </span> <!> <span class="item-price svelte-p4z19o"> </span> <!></div></div>'),Go=A('<div class="purchase-group svelte-p4z19o"><div class="purchase-header svelte-p4z19o"><strong class="svelte-p4z19o"> </strong> <span class="total-amount svelte-p4z19o"> </span></div> <div class="purchased-items-list svelte-p4z19o"></div></div>'),Uo=A('<main class="svelte-p4z19o"><h1 class="svelte-p4z19o">Grocery</h1> <!> <!> <!> <h2 class="svelte-p4z19o">Purchased Items</h2> <!> <!></main>');function Yo(e,t){Ur(t,!1);let r=[],n=z([]),o=z(""),s=z(""),i=z(""),c=z(1),d=z(!1),p=z(!1),y=[],f=z([]),v=z([]),g=z(new Date().toISOString().split("T")[0]),m=z(!1),x=z(""),$=!1,j=z(!1),B=z(!0),w=z(!1),S=z({top:"0px",left:"0px"}),fe=z(null),re=z(null);async function K(){try{r=(await(await fetch("/api/serve_groceries.php?t="+new Date().getTime(),{cache:"no-cache"})).json()).groceries,r=r.sort((_,h)=>_.name.localeCompare(h.name)),y=Array.from(new Set(r.map(_=>_.category))).sort(),u(n,r),u(f,y)}catch(l){console.error("Failed to load groceries data:",l)}}async function ne(){return Io("budget-management",1,{upgrade(l){l.objectStoreNames.contains("purchases")||l.createObjectStore("purchases",{keyPath:"id",autoIncrement:!0}),l.objectStoreNames.contains("groceries")||l.createObjectStore("groceries",{keyPath:"name"})}})}async function De(){const l=await ne();if(u(v,await l.getAll("purchases")),navigator.onLine)try{const h=await(await fetch("/api/get_purchases.php")).json();if(h.status==="success"){u(v,h.data);const k=l.transaction("purchases","readwrite");await k.objectStore("purchases").clear();for(const M of a(v))await k.objectStore("purchases").put(M);u(x,"Data has been successfully refreshed from the server."),setTimeout(()=>{u(x,"")},3e3)}}catch(_){console.error("Error fetching purchased items:",_)}}async function oe(){if(navigator.onLine){const l=await ne(),_=await l.getAll("groceries");for(const h of _)try{const M=await(await fetch("/api/update_groceries.php",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(h)})).json();M.status==="success"?(console.log(`Grocery item synced successfully: ${h.name}`),await l.delete("groceries",h.name)):console.error(`Failed to sync item ${h.name}:`,M.message)}catch(k){console.error("Error syncing grocery item:",k)}}else console.warn("Device is offline. Unable to sync groceries.")}window.addEventListener("online",()=>{console.log("Network status: Online. Syncing groceries..."),oe()}),Je(()=>{K(),De(),oe(),Ie()});function Ie(){u(v,a(v).sort((l,_)=>new Date(_.date)-new Date(l.date)))}function it(){u(n,r),u(d,!0)}function Fe(){u(f,y),u(p,!0)}function qe(){setTimeout(()=>{u(d,!1)},200)}function Re(){setTimeout(()=>{u(p,!1)},200)}function je(){a(o).trim()===""?u(n,r):u(n,r.filter(l=>l.name.toLowerCase().includes(a(o).toLowerCase()))),u(d,a(n).length>0)}function Ve(){a(s).trim()===""?u(f,y):u(f,y.filter(l=>l.toLowerCase().includes(a(s).toLowerCase()))),u(p,a(f).length>0)}function Xr(l){u(o,l),u(d,!1),en(l)}function Zr(l){u(s,l),u(p,!1)}function en(l){const _=r.find(h=>h.name.toLowerCase()===l.toLowerCase());_?(u(o,_.name),u(s,_.category),u(i,_.price)):(u(s,""),u(i,"")),u(n,[])}async function tn(){if(a(o)&&a(s)&&a(i)&&a(g)){u(B,!1);const l={name:a(o),category:a(s),price:parseFloat(a(i).replace(/,/g,""))||0,quantity:parseInt(a(c).toString(),10)||1,date:a(g)};if(!r.some(h=>h.name.toLowerCase()===a(o).toLowerCase())){try{const h={name:l.name,category:l.category,price:l.price};await(await ne()).put("groceries",h),console.log(`Grocery item added locally: ${h.name}`)}catch(h){console.error("Error adding grocery to IndexedDB:",h)}try{const k=await(await fetch("/api/update_groceries.php",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:l.name,category:l.category,price:l.price})})).json();k.status==="success"?await K():console.error(k.message)}catch(h){console.error("Error adding item to groceries:",h)}}try{const h=await fetch("/api/add_purchase.php",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)});await(await ne()).put("purchases",l);const M=await h.text();console.log("Raw response:",M);const he=JSON.parse(M);he.status==="success"?console.log("Item added to SQLite database successfully!"):console.error(he.message)}catch(h){console.error("Error adding item to database:",h)}u(v,[...a(v),l]),u(v,a(v).sort((h,k)=>new Date(k.date).getTime()-new Date(h.date).getTime())),u(o,""),u(s,""),u(i,""),u(c,1),u(g,new Date().toISOString().split("T")[0]),u(j,!1),u(w,!1),u(m,!0),setTimeout(()=>{u(m,!1),u(B,!0)},3e3)}else alert("Please fill in all fields, including date.")}function rn(l){return a(v).filter(_=>_.date===l).reduce((_,h)=>_+h.price*h.quantity,0).toFixed(2)}function Mt(l){u(fe,a(fe)===l?null:l),u(re,a(fe))}function Ft(l){!l.target.closest(".purchased-item")&&!l.target.closest(".delete-btn")&&(u(fe,null),u(re,null))}Je(()=>{document.addEventListener("click",Ft)}),ur(()=>{document.removeEventListener("click",Ft)});async function nn(l){try{u(v,a(v).filter(M=>M.id!==l));const h=await(await fetch("/api/delete_purchase.php",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:l})})).json();h.status==="success"?console.log("Item deleted successfully."):console.error(h.message),await(await ne()).delete("purchases",l)}catch(_){console.error("Error deleting item:",_)}}function on(){return Array.from(new Set(a(v).map(l=>l.date))).sort((l,_)=>new Date(_)-new Date(l))}function qt(l){return l.replace(/[^\d]/g,"").replace(/\B(?=(\d{3})+(?!\d))/g,",")}function Rt(l){l==="C"?u(i,""):l==="Del"?u(i,a(i).slice(0,-1)):l==="000"?u(i,a(i)+"000"):u(i,a(i)+l),u(i,qt(a(i)))}function sn(l){u(i,qt(l.target.value))}function an(l){u(w,!0);const _=l.target.getBoundingClientRect(),h=document.querySelector(".input-section").getBoundingClientRect();u(S,{top:`${_.bottom-h.top+10}px`,left:`${_.left-h.left}px`}),l.target.blur()}function jt(l){document.querySelector(".calculator"),!l.target.closest(".calculator")&&!l.target.closest("#price")&&u(w,!1)}function ln(){u(w,!1)}Je(()=>{document.addEventListener("click",jt)}),ur(()=>{document.removeEventListener("click",jt)}),_o();var Vt=Uo(),$t=E(I(Vt),2);W($t,()=>a(m),l=>{var _=Lo();P(l,_)});var Wt=E($t,2);W(Wt,()=>!a(j),l=>{var _=Oo();O("click",_,()=>u(j,!0)),P(l,_)});var Kt=E(Wt,2);W(Kt,()=>a(j),l=>{var _=Vo(),h=I(_),k=E(I(h),2),M=E(k,2);W(M,()=>a(o),C=>{var L=Po();O("click",L,()=>u(o,"")),P(C,L)});var he=E(M,2);W(he,()=>a(d),C=>{var L=zo();we(L,5,()=>a(n),ye,(H,q)=>{var G=Ao(),se=I(G),xe=I(se);U(()=>Z(xe,a(q).name)),O("click",se,()=>Xr(a(q).name)),P(H,G)}),P(C,L)});var $e=E(h,2),de=E(I($e),2),We=E(de,2);W(We,()=>a(s),C=>{var L=No();O("click",L,()=>u(s,"")),P(C,L)});var Se=E(We,2);W(Se,()=>a(p),C=>{var L=Mo();we(L,5,()=>a(f),ye,(H,q)=>{var G=Bo(),se=I(G),xe=I(se);U(()=>Z(xe,a(q))),O("click",se,()=>Zr(a(q))),P(H,G)}),P(C,L)});var F=E($e,2),Ke=I(F),Y=E(I(Ke),2),at=E(Ke,2),He=E(I(at),2),Te=E(F,2),lt=E(I(Te),2),Ce=E(Te,2);W(Ce,()=>a(B),C=>{var L=Fo();U(()=>vo(L,"fade-out",!a(B))),O("click",L,tn),P(C,L)});var Ge=E(Ce,2);W(Ge,()=>a(w),C=>{var L=jo(),H=I(L),q=I(H);we(q,0,()=>[["7","8","9"],["4","5","6"],["1","2","3"],["C","0","000"]],ye,(cn,fn)=>{var Gt=Ro();we(Gt,5,()=>fn,ye,(dn,Ue)=>{var Ye=qo();const vn=zn(()=>`calc-button ${(typeof a(Ue)=="string"&&!["C","000","Del","OK"].includes(a(Ue))?"number":"")??""} svelte-p4z19o`);var pn=I(Ye);U(()=>{sr(Ye,a(vn)),Z(pn,a(Ue))}),O("click",Ye,()=>Rt(a(Ue))),P(dn,Ye)}),P(cn,Gt)});var G=E(q,2),se=I(G),xe=E(se,2);U(()=>nr(L,"style",`top: ${a(S).top??""}; left: ${a(S).left??""};`)),O("click",se,()=>Rt("Del")),O("click",xe,ln),P(C,L)}),ke(k,()=>a(o),C=>u(o,C)),O("input",k,je),O("focus",k,it),O("blur",k,qe),ke(de,()=>a(s),C=>u(s,C)),O("input",de,Ve),O("focus",de,Fe),O("blur",de,Re),ke(Y,()=>a(i),C=>u(i,C)),O("focus",Y,an),O("input",Y,sn),ke(He,()=>a(c),C=>u(c,C)),ke(lt,()=>a(g),C=>u(g,C)),P(l,_)});var Ht=E(Kt,4);W(Ht,()=>$,l=>{var _=$o(),h=I(_);U(()=>Z(h,a(x))),P(l,_)});var un=E(Ht,2);we(un,1,on,ye,(l,_)=>{var h=Go(),k=I(h),M=I(k),he=I(M);U(()=>Z(he,a(_)===new Date().toISOString().split("T")[0]?"Today":a(_)));var $e=E(M,2),de=I($e);U(()=>Z(de,`Total: Rp ${parseFloat(rn(a(_))).toLocaleString()??""}`));var We=E(k,2);we(We,5,()=>a(v).filter(Se=>Se.date===a(_)),ye,(Se,F,Ke)=>{var Y=Ho(),at=I(Y),He=I(at);He.textContent=`${Ke+1}.`;var Te=E(He,2),lt=I(Te),Ce=E(Te,2);W(Ce,()=>a(F).quantity>1,H=>{var q=Wo(),G=I(q);U(()=>Z(G,a(F).quantity)),P(H,q)});var Ge=E(Ce,2),C=I(Ge);U(()=>Z(C,`Rp ${(a(F).price*a(F).quantity).toLocaleString()??""}`));var L=E(Ge,2);W(L,()=>a(re)===a(F).id,H=>{var q=Ko();O("click",q,G=>{G.stopPropagation(),nn(a(F).id)}),P(H,q)}),U(()=>{nr(Y,"data-id",a(F).id),sr(Y,`purchased-item ${(a(fe)===a(F).id?"highlighted":"")??""} svelte-p4z19o`),Z(lt,`${a(F).name??""} - ${a(F).category??""}`)}),O("click",Y,()=>Mt(a(F).id)),O("keydown",Y,H=>H.key==="Enter"&&Mt(a(F).id)),P(Se,Y)}),P(l,h)}),P(e,Vt),Yr()}no(Yo,{target:document.getElementById("app")});"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/service-worker.js").then(e=>{console.log("Service Worker registered with scope: ",e.scope)},e=>{console.error("Service Worker registration failed: ",e)})});window.addEventListener("online",()=>{console.log("Network status: Online. Syncing groceries..."),syncGroceriesWithServer(),fetchPurchasedItems()});
