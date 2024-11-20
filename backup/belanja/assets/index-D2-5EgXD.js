(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();const Pr=!1;var En=Array.isArray,Ot=Array.from,Nr=Object.defineProperty,tn=Object.getOwnPropertyDescriptor,Sn=Object.getOwnPropertyDescriptors,gt=Object.getPrototypeOf;const Le=()=>{};function Br(e){return e()}function yt(e){for(var t=0;t<e.length;t++)e[t]()}const ie=2,Tn=4,Ve=8,At=16,te=32,st=64,me=128,tt=256,W=512,ve=1024,We=2048,ae=4096,He=8192,Mr=16384,Pt=32768,qr=1<<18,Dn=1<<19,nn=Symbol("$state"),Rr=Symbol("");function In(e){return e===this.v}function Cn(e,t){return e!=e?t==t:e!==t||e!==null&&typeof e=="object"||typeof e=="function"}function kn(e){return!Cn(e,this.v)}function jr(e){throw new Error("effect_in_teardown")}function Fr(){throw new Error("effect_in_unowned_derived")}function $r(e){throw new Error("effect_orphan")}function Vr(){throw new Error("effect_update_depth_exceeded")}function Wr(){throw new Error("state_unsafe_local_read")}function Hr(){throw new Error("state_unsafe_mutation")}function nt(e){return{f:0,v:e,reactions:null,equals:In,version:0}}function Nt(e,t=!1){var r;const n=nt(e);return t||(n.equals=kn),k!==null&&k.l!==null&&((r=k.l).s??(r.s=[])).push(n),n}function N(e,t=!1){return Kr(Nt(e,t))}function Kr(e){return S!==null&&S.f&ie&&(ee===null?ro([e]):ee.push(e)),e}function f(e,t){return S!==null&&at()&&S.f&(ie|At)&&(ee===null||!ee.includes(e))&&Hr(),bt(e,t)}function bt(e,t){return e.equals(t)||(e.v=t,e.version=Zn(),Ln(e,ve),at()&&m!==null&&m.f&W&&!(m.f&te)&&(M!==null&&M.includes(e)?(ne(m,ve),lt(m)):de===null?oo([e]):de.push(e))),t}function Ln(e,t){var n=e.reactions;if(n!==null)for(var r=at(),o=n.length,s=0;s<o;s++){var a=n[s],u=a.f;u&ve||!r&&a===m||(ne(a,t),u&(W|me)&&(u&ie?Ln(a,We):lt(a)))}}const Bt=1,Mt=2,On=4,Gr=8,Jr=16,Ur=2;let An=!1;var rn,Pn,Nn;function Yr(){if(rn===void 0){rn=window;var e=Element.prototype,t=Node.prototype;Pn=tn(t,"firstChild").get,Nn=tn(t,"nextSibling").get,e.__click=void 0,e.__className="",e.__attributes=null,e.__styles=null,e.__e=void 0,Text.prototype.__t=void 0}}function qt(e=""){return document.createTextNode(e)}function Bn(e){return Pn.call(e)}function Rt(e){return Nn.call(e)}function E(e,t){return Bn(e)}function x(e,t=1,n=!1){let r=e;for(;t--;)r=Rt(r);return r}function Qr(e){e.textContent=""}function Mn(e){var t=ie|ve;m===null?t|=me:m.f|=Dn;const n={children:null,ctx:k,deps:null,equals:In,f:t,fn:e,reactions:null,v:null,version:0,parent:m};if(S!==null&&S.f&ie){var r=S;(r.children??(r.children=[])).push(n)}return n}function zr(e){const t=Mn(e);return t.equals=kn,t}function qn(e){var t=e.children;if(t!==null){e.children=null;for(var n=0;n<t.length;n+=1){var r=t[n];r.f&ie?jt(r):Ee(r)}}}function Rn(e){var t,n=m;pe(e.parent);try{qn(e),t=er(e)}finally{pe(n)}return t}function jn(e){var t=Rn(e),n=(ke||e.f&me)&&e.deps!==null?We:W;ne(e,n),e.equals(t)||(e.v=t,e.version=Zn())}function jt(e){qn(e),$e(e,0),ne(e,He),e.v=e.children=e.deps=e.ctx=e.reactions=null}function Fn(e){m===null&&S===null&&$r(),S!==null&&S.f&me&&Fr(),Vt&&jr()}function Xr(e,t){var n=t.last;n===null?t.last=t.first=e:(n.next=e,e.prev=n,t.last=e)}function Ae(e,t,n,r=!0){var o=(e&st)!==0,s=m,a={ctx:k,deps:null,deriveds:null,nodes_start:null,nodes_end:null,f:e|ve,first:null,fn:t,last:null,next:null,parent:o?null:s,prev:null,teardown:null,transitions:null,version:0};if(n){var u=Oe;try{on(!0),it(a),a.f|=Mr}catch(b){throw Ee(a),b}finally{on(u)}}else t!==null&&lt(a);var c=n&&a.deps===null&&a.first===null&&a.nodes_start===null&&a.teardown===null&&(a.f&Dn)===0;if(!c&&!o&&r&&(s!==null&&Xr(a,s),S!==null&&S.f&ie)){var v=S;(v.children??(v.children=[])).push(a)}return a}function $n(e){const t=Ae(Ve,null,!1);return ne(t,W),t.teardown=e,t}function wt(e){Fn();var t=m!==null&&(m.f&te)!==0&&k!==null&&!k.m;if(t){var n=k;(n.e??(n.e=[])).push({fn:e,effect:m,reaction:S})}else{var r=Vn(e);return r}}function Zr(e){return Fn(),Wn(e)}function eo(e){const t=Ae(st,e,!0);return()=>{Ee(t)}}function Vn(e){return Ae(Tn,e,!1)}function Wn(e){return Ae(Ve,e,!0)}function $(e){return Ft(e)}function Ft(e,t=0){return Ae(Ve|At|t,e,!0)}function Fe(e,t=!0){return Ae(Ve|te,e,!0,t)}function Hn(e){var t=e.teardown;if(t!==null){const n=Vt,r=S;sn(!0),_e(null);try{t.call(null)}finally{sn(n),_e(r)}}}function Kn(e){var t=e.deriveds;if(t!==null){e.deriveds=null;for(var n=0;n<t.length;n+=1)jt(t[n])}}function Gn(e,t=!1){var n=e.first;for(e.first=e.last=null;n!==null;){var r=n.next;Ee(n,t),n=r}}function to(e){for(var t=e.first;t!==null;){var n=t.next;t.f&te||Ee(t),t=n}}function Ee(e,t=!0){var n=!1;if((t||e.f&qr)&&e.nodes_start!==null){for(var r=e.nodes_start,o=e.nodes_end;r!==null;){var s=r===o?null:Rt(r);r.remove(),r=s}n=!0}Gn(e,t&&!n),Kn(e),$e(e,0),ne(e,He);var a=e.transitions;if(a!==null)for(const c of a)c.stop();Hn(e);var u=e.parent;u!==null&&u.first!==null&&Jn(e),e.next=e.prev=e.teardown=e.ctx=e.deps=e.parent=e.fn=e.nodes_start=e.nodes_end=null}function Jn(e){var t=e.parent,n=e.prev,r=e.next;n!==null&&(n.next=r),r!==null&&(r.prev=n),t!==null&&(t.first===e&&(t.first=r),t.last===e&&(t.last=n))}function xt(e,t){var n=[];$t(e,n,!0),Un(n,()=>{Ee(e),t&&t()})}function Un(e,t){var n=e.length;if(n>0){var r=()=>--n||t();for(var o of e)o.out(r)}else t()}function $t(e,t,n){if(!(e.f&ae)){if(e.f^=ae,e.transitions!==null)for(const a of e.transitions)(a.is_global||n)&&t.push(a);for(var r=e.first;r!==null;){var o=r.next,s=(r.f&Pt)!==0||(r.f&te)!==0;$t(r,t,s?n:!1),r=o}}}function rt(e){Yn(e,!0)}function Yn(e,t){if(e.f&ae){e.f^=ae,Ke(e)&&it(e);for(var n=e.first;n!==null;){var r=n.next,o=(n.f&Pt)!==0||(n.f&te)!==0;Yn(n,o?t:!1),n=r}if(e.transitions!==null)for(const s of e.transitions)(s.is_global||t)&&s.in()}}let mt=!1,Et=[];function no(){mt=!1;const e=Et.slice();Et=[],yt(e)}function Qn(e){mt||(mt=!0,queueMicrotask(no)),Et.push(e)}function zn(e){throw new Error("lifecycle_outside_component")}let ot=!1,Oe=!1,Vt=!1;function on(e){Oe=e}function sn(e){Vt=e}let St=[],je=0;let S=null;function _e(e){S=e}let m=null;function pe(e){m=e}let ee=null;function ro(e){ee=e}let M=null,H=0,de=null;function oo(e){de=e}let Xn=0,ke=!1,k=null;function Zn(){return++Xn}function at(){return k!==null&&k.l===null}function Ke(e){var a,u;var t=e.f;if(t&ve)return!0;if(t&We){var n=e.deps,r=(t&me)!==0;if(n!==null){var o;if(t&tt){for(o=0;o<n.length;o++)((a=n[o]).reactions??(a.reactions=[])).push(e);e.f^=tt}for(o=0;o<n.length;o++){var s=n[o];if(Ke(s)&&jn(s),r&&m!==null&&!ke&&!((u=s==null?void 0:s.reactions)!=null&&u.includes(e))&&(s.reactions??(s.reactions=[])).push(e),s.version>e.version)return!0}}r||ne(e,W)}return!1}function so(e,t,n){throw e}function er(e){var y;var t=M,n=H,r=de,o=S,s=ke,a=ee,u=k,c=e.f;M=null,H=0,de=null,S=c&(te|st)?null:e,ke=!Oe&&(c&me)!==0,ee=null,k=e.ctx;try{var v=(0,e.fn)(),b=e.deps;if(M!==null){var _;if($e(e,H),b!==null&&H>0)for(b.length=H+M.length,_=0;_<M.length;_++)b[H+_]=M[_];else e.deps=b=M;if(!ke)for(_=H;_<b.length;_++)((y=b[_]).reactions??(y.reactions=[])).push(e)}else b!==null&&H<b.length&&($e(e,H),b.length=H);return v}finally{M=t,H=n,de=r,S=o,ke=s,ee=a,k=u}}function ao(e,t){let n=t.reactions;if(n!==null){var r=n.indexOf(e);if(r!==-1){var o=n.length-1;o===0?n=t.reactions=null:(n[r]=n[o],n.pop())}}n===null&&t.f&ie&&(M===null||!M.includes(t))&&(ne(t,We),t.f&(me|tt)||(t.f^=tt),$e(t,0))}function $e(e,t){var n=e.deps;if(n!==null)for(var r=t;r<n.length;r++)ao(e,n[r])}function it(e){var t=e.f;if(!(t&He)){ne(e,W);var n=m;m=e;try{t&At?to(e):Gn(e),Kn(e),Hn(e);var r=er(e);e.teardown=typeof r=="function"?r:null,e.version=Xn}catch(o){so(o)}finally{m=n}}}function io(){je>1e3&&(je=0,Vr()),je++}function lo(e){var t=e.length;if(t!==0){io();var n=Oe;Oe=!0;try{for(var r=0;r<t;r++){var o=e[r];o.f&W||(o.f^=W);var s=[];tr(o,s),uo(s)}}finally{Oe=n}}}function uo(e){var t=e.length;if(t!==0)for(var n=0;n<t;n++){var r=e[n];!(r.f&(He|ae))&&Ke(r)&&(it(r),r.deps===null&&r.first===null&&r.nodes_start===null&&(r.teardown===null?Jn(r):r.fn=null))}}function co(){if(ot=!1,je>1001)return;const e=St;St=[],lo(e),ot||(je=0)}function lt(e){ot||(ot=!0,queueMicrotask(co));for(var t=e;t.parent!==null;){t=t.parent;var n=t.f;if(n&(st|te)){if(!(n&W))return;t.f^=W}}St.push(t)}function tr(e,t){var n=e.first,r=[];e:for(;n!==null;){var o=n.f,s=(o&te)!==0,a=s&&(o&W)!==0;if(!a&&!(o&ae))if(o&Ve){s?n.f^=W:Ke(n)&&it(n);var u=n.first;if(u!==null){n=u;continue}}else o&Tn&&r.push(n);var c=n.next;if(c===null){let _=n.parent;for(;_!==null;){if(e===_)break e;var v=_.next;if(v!==null){n=v;continue e}_=_.parent}}n=c}for(var b=0;b<r.length;b++)u=r[b],t.push(u),tr(u,t)}function l(e){var u;var t=e.f,n=(t&ie)!==0;if(n&&t&He){var r=Rn(e);return jt(e),r}if(S!==null){ee!==null&&ee.includes(e)&&Wr();var o=S.deps;M===null&&o!==null&&o[H]===e?H++:M===null?M=[e]:M.push(e),de!==null&&m!==null&&m.f&W&&!(m.f&te)&&de.includes(e)&&(ne(m,ve),lt(m))}else if(n&&e.deps===null){var s=e,a=s.parent;a!==null&&!((u=a.deriveds)!=null&&u.includes(s))&&(a.deriveds??(a.deriveds=[])).push(s)}return n&&(s=e,Ke(s)&&jn(s)),e.v}function ut(e){const t=S;try{return S=null,e()}finally{S=t}}const fo=~(ve|We|W);function ne(e,t){e.f=e.f&fo|t}function nr(e,t=!1,n){k={p:k,c:null,e:null,m:!1,s:e,x:null,l:null},t||(k.l={s:null,u:null,r1:[],r2:nt(!1)})}function rr(e){const t=k;if(t!==null){const a=t.e;if(a!==null){var n=m,r=S;t.e=null;try{for(var o=0;o<a.length;o++){var s=a[o];pe(s.effect),_e(s.reaction),Vn(s.fn)}}finally{pe(n),_e(r)}}k=t.p,t.m=!0}return{}}function vo(e){if(!(typeof e!="object"||!e||e instanceof EventTarget)){if(nn in e)Tt(e);else if(!Array.isArray(e))for(let t in e){const n=e[t];typeof n=="object"&&n&&nn in n&&Tt(n)}}}function Tt(e,t=new Set){if(typeof e=="object"&&e!==null&&!(e instanceof EventTarget)&&!t.has(e)){t.add(e),e instanceof Date&&e.getTime();for(let r in e)try{Tt(e[r],t)}catch{}const n=gt(e);if(n!==Object.prototype&&n!==Array.prototype&&n!==Map.prototype&&n!==Set.prototype&&n!==Date.prototype){const r=Sn(n);for(let o in r){const s=r[o].get;if(s)try{s.call(e)}catch{}}}}}const _o=new Set,an=new Set;function po(e,t,n,r){function o(s){if(r.capture||Re.call(t,s),!s.cancelBubble){var a=S,u=m;_e(null),pe(null);try{return n.call(this,s)}finally{_e(a),pe(u)}}}return e.startsWith("pointer")||e.startsWith("touch")||e==="wheel"?Qn(()=>{t.addEventListener(e,o,r)}):t.addEventListener(e,o,r),o}function C(e,t,n,r,o){var s={capture:r,passive:o},a=po(e,t,n,s);(t===document.body||t===window||t===document)&&$n(()=>{t.removeEventListener(e,a,s)})}function Re(e){var G;var t=this,n=t.ownerDocument,r=e.type,o=((G=e.composedPath)==null?void 0:G.call(e))||[],s=o[0]||e.target,a=0,u=e.__root;if(u){var c=o.indexOf(u);if(c!==-1&&(t===document||t===window)){e.__root=t;return}var v=o.indexOf(t);if(v===-1)return;c<=v&&(a=c)}if(s=o[a]||e.target,s!==t){Nr(e,"currentTarget",{configurable:!0,get(){return s||n}});var b=S,_=m;_e(null),pe(null);try{for(var y,g=[];s!==null;){var h=s.assignedSlot||s.parentNode||s.host||null;try{var I=s["__"+r];if(I!==void 0&&!s.disabled)if(En(I)){var[R,...K]=I;R.apply(s,[e,...K])}else I.call(s,e)}catch(w){y?g.push(w):y=w}if(e.cancelBubble||h===t||h===null)break;s=h}if(y){for(let w of g)queueMicrotask(()=>{throw w});throw y}}finally{e.__root=t,delete e.currentTarget,_e(b),pe(_)}}}function ho(e){var t=document.createElement("template");return t.innerHTML=e,t.content}function or(e,t){var n=m;n.nodes_start===null&&(n.nodes_start=e,n.nodes_end=t)}function A(e,t){var n=(t&Ur)!==0,r,o=!e.startsWith("<!>");return()=>{r===void 0&&(r=ho(o?e:"<!>"+e),r=Bn(r));var s=n?document.importNode(r,!0):r.cloneNode(!0);return or(s,s),s}}function go(e=""){{var t=qt(e+"");return or(t,t),t}}function O(e,t){e!==null&&e.before(t)}const yo=["touchstart","touchmove"];function bo(e){return yo.includes(e)}function J(e,t){var n=t==null?"":typeof t=="object"?t+"":t;n!==(e.__t??(e.__t=e.nodeValue))&&(e.__t=n,e.nodeValue=n==null?"":n+"")}function wo(e,t){return xo(e,t)}const De=new Map;function xo(e,{target:t,anchor:n,props:r={},events:o,context:s,intro:a=!0}){Yr();var u=new Set,c=_=>{for(var y=0;y<_.length;y++){var g=_[y];if(!u.has(g)){u.add(g);var h=bo(g);t.addEventListener(g,Re,{passive:h});var I=De.get(g);I===void 0?(document.addEventListener(g,Re,{passive:h}),De.set(g,1)):De.set(g,I+1)}}};c(Ot(_o)),an.add(c);var v=void 0,b=eo(()=>{var _=n??t.appendChild(qt());return Fe(()=>{if(s){nr({});var y=k;y.c=s}o&&(r.$$events=o),v=e(_,r)||{},s&&rr()}),()=>{var h;for(var y of u){t.removeEventListener(y,Re);var g=De.get(y);--g===0?(document.removeEventListener(y,Re),De.delete(y)):De.set(y,g)}an.delete(c),ln.delete(v),_!==n&&((h=_.parentNode)==null||h.removeChild(_))}});return ln.set(v,b),v}let ln=new WeakMap;function V(e,t,n,r=null,o=!1){var s=e,a=null,u=null,c=null,v=o?Pt:0;Ft(()=>{c!==(c=!!t())&&(c?(a?rt(a):a=Fe(()=>n(s)),u&&xt(u,()=>{u=null})):(u?rt(u):r&&(u=Fe(()=>r(s))),a&&xt(a,()=>{a=null})))},v)}let _t=null;function be(e,t){return t}function mo(e,t,n,r){for(var o=[],s=t.length,a=0;a<s;a++)$t(t[a].e,o,!0);var u=s>0&&o.length===0&&n!==null;if(u){var c=n.parentNode;Qr(c),c.append(n),r.clear(),fe(e,t[0].prev,t[s-1].next)}Un(o,()=>{for(var v=0;v<s;v++){var b=t[v];u||(r.delete(b.k),fe(e,b.prev,b.next)),Ee(b.e,!u)}})}function we(e,t,n,r,o,s=null){var a=e,u={flags:t,items:new Map,first:null},c=(t&On)!==0;if(c){var v=e;a=v.appendChild(qt())}var b=null,_=!1;Ft(()=>{var y=n(),g=En(y)?y:y==null?[]:Ot(y),h=g.length;_&&h===0||(_=h===0,Eo(g,u,a,o,t,r),s!==null&&(h===0?b?rt(b):b=Fe(()=>s(a)):b!==null&&xt(b,()=>{b=null})),n())})}function Eo(e,t,n,r,o,s){var Pe,z,Ge,Ne;var a=(o&Gr)!==0,u=(o&(Bt|Mt))!==0,c=e.length,v=t.items,b=t.first,_=b,y,g=null,h,I=[],R=[],K,G,w,T;if(a)for(T=0;T<c;T+=1)K=e[T],G=s(K,T),w=v.get(G),w!==void 0&&((Pe=w.a)==null||Pe.measure(),(h??(h=new Set)).add(w));for(T=0;T<c;T+=1){if(K=e[T],G=s(K,T),w=v.get(G),w===void 0){var he=_?_.e.nodes_start:n;g=To(he,t,g,g===null?t.first:g.next,K,G,T,r,o),v.set(G,g),I=[],R=[],_=g.next;continue}if(u&&So(w,K,T,o),w.e.f&ae&&(rt(w.e),a&&((z=w.a)==null||z.unfix(),(h??(h=new Set)).delete(w))),w!==_){if(y!==void 0&&y.has(w)){if(I.length<R.length){var le=R[0],j;g=le.prev;var Se=I[0],re=I[I.length-1];for(j=0;j<I.length;j+=1)un(I[j],le,n);for(j=0;j<R.length;j+=1)y.delete(R[j]);fe(t,Se.prev,re.next),fe(t,g,Se),fe(t,re,le),_=le,g=re,T-=1,I=[],R=[]}else y.delete(w),un(w,_,n),fe(t,w.prev,w.next),fe(t,w,g===null?t.first:g.next),fe(t,g,w),g=w;continue}for(I=[],R=[];_!==null&&_.k!==G;)_.e.f&ae||(y??(y=new Set)).add(_),R.push(_),_=_.next;if(_===null)continue;w=_}I.push(w),g=w,_=w.next}if(_!==null||y!==void 0){for(var oe=y===void 0?[]:Ot(y);_!==null;)_.e.f&ae||oe.push(_),_=_.next;var se=oe.length;if(se>0){var Te=o&On&&c===0?n:null;if(a){for(T=0;T<se;T+=1)(Ge=oe[T].a)==null||Ge.measure();for(T=0;T<se;T+=1)(Ne=oe[T].a)==null||Ne.fix()}mo(t,oe,Te,v)}}a&&Qn(()=>{var Je;if(h!==void 0)for(w of h)(Je=w.a)==null||Je.apply()}),m.first=t.first&&t.first.e,m.last=g&&g.e}function So(e,t,n,r){r&Bt&&bt(e.v,t),r&Mt?bt(e.i,n):e.i=n}function To(e,t,n,r,o,s,a,u,c){var v=_t;try{var b=(c&Bt)!==0,_=(c&Jr)===0,y=b?_?Nt(o):nt(o):o,g=c&Mt?nt(a):a,h={i:g,v:y,k:s,a:null,e:null,prev:n,next:r};return _t=h,h.e=Fe(()=>u(e,y,g),An),h.e.prev=n&&n.e,h.e.next=r&&r.e,n===null?t.first=h:(n.next=h,n.e.next=h.e),r!==null&&(r.prev=h,r.e.prev=h.e),h}finally{_t=v}}function un(e,t,n){for(var r=e.next?e.next.e.nodes_start:n,o=t?t.e.nodes_start:n,s=e.e.nodes_start;s!==r;){var a=Rt(s);o.before(s),s=a}}function fe(e,t,n){t===null?e.first=n:(t.next=n,t.e.next=n&&n.e),n!==null&&(n.prev=t,n.e.prev=t&&t.e)}let cn=!1;function Do(){cn||(cn=!0,document.addEventListener("reset",e=>{Promise.resolve().then(()=>{var t;if(!e.defaultPrevented)for(const n of e.target.elements)(t=n.__on_r)==null||t.call(n)})},{capture:!0}))}function fn(e,t,n,r){var o=e.__attributes??(e.__attributes={});o[t]!==(o[t]=n)&&(t==="style"&&"__styles"in e&&(e.__styles={}),t==="loading"&&(e[Rr]=n),n==null?e.removeAttribute(t):typeof n!="string"&&Io(e).includes(t)?e[t]=n:e.setAttribute(t,n))}var dn=new Map;function Io(e){var t=dn.get(e.nodeName);if(t)return t;dn.set(e.nodeName,t=[]);for(var n,r=gt(e),o=Element.prototype;o!==r;){n=Sn(r);for(var s in n)n[s].set&&t.push(s);r=gt(r)}return t}function vn(e,t){var n=e.__className,r=Co(t);(n!==r||An)&&(t==null?e.removeAttribute("class"):e.className=r,e.__className=r)}function Co(e){return e??""}function ko(e,t,n){if(n){if(e.classList.contains(t))return;e.classList.add(t)}else{if(!e.classList.contains(t))return;e.classList.remove(t)}}function Lo(e,t,n,r=n){e.addEventListener(t,n);const o=e.__on_r;o?e.__on_r=()=>{o(),r()}:e.__on_r=r,Do()}function Ie(e,t,n=t){var r=at();Lo(e,"input",()=>{var o=_n(e)?pn(e.value):e.value;n(o),r&&o!==(o=t())&&(e.value=o??"")}),Wn(()=>{var o=t();_n(e)&&o===pn(e.value)||e.type==="date"&&!o&&!e.value||o!==e.value&&(e.value=o??"")})}function _n(e){var t=e.type;return t==="number"||t==="range"}function pn(e){return e===""?null:+e}function Oo(e=!1){const t=k,n=t.l.u;if(!n)return;let r=()=>vo(t.s);if(e){let o=0,s={};const a=Mn(()=>{let u=!1;const c=t.s;for(const v in c)c[v]!==s[v]&&(s[v]=c[v],u=!0);return u&&o++,o});r=()=>l(a)}n.b.length&&Zr(()=>{hn(t,r),yt(n.b)}),wt(()=>{const o=ut(()=>n.m.map(Br));return()=>{for(const s of o)typeof s=="function"&&s()}}),n.a.length&&wt(()=>{hn(t,r),yt(n.a)})}function hn(e,t){if(e.l.s)for(const n of e.l.s)l(n);t()}function Ao(e,t,n){if(e==null)return t(void 0),Le;const r=ut(()=>e.subscribe(t,n));return r.unsubscribe?()=>r.unsubscribe():r}function Po(e,t,n){const r=n[t]??(n[t]={store:null,source:Nt(void 0),unsubscribe:Le});if(r.store!==e)if(r.unsubscribe(),r.store=e??null,e==null)r.source.v=void 0,r.unsubscribe=Le;else{var o=!0;r.unsubscribe=Ao(e,s=>{o?r.source.v=s:f(r.source,s)}),o=!1}return l(r.source)}function No(){const e={};return $n(()=>{for(var t in e)e[t].unsubscribe()}),e}function et(e){k===null&&zn(),k.l!==null?Bo(k).m.push(e):wt(()=>{const t=ut(e);if(typeof t=="function")return t})}function gn(e){k===null&&zn(),et(()=>()=>ut(e))}function Bo(e){var t=e.l;return t.u??(t.u={a:[],b:[],m:[]})}const Mo="5";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(Mo);const Dt=(e,t)=>t.some(n=>e instanceof n);let yn,bn;function qo(){return yn||(yn=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Ro(){return bn||(bn=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const It=new WeakMap,pt=new WeakMap,ct=new WeakMap;function jo(e){const t=new Promise((n,r)=>{const o=()=>{e.removeEventListener("success",s),e.removeEventListener("error",a)},s=()=>{n(xe(e.result)),o()},a=()=>{r(e.error),o()};e.addEventListener("success",s),e.addEventListener("error",a)});return ct.set(t,e),t}function Fo(e){if(It.has(e))return;const t=new Promise((n,r)=>{const o=()=>{e.removeEventListener("complete",s),e.removeEventListener("error",a),e.removeEventListener("abort",a)},s=()=>{n(),o()},a=()=>{r(e.error||new DOMException("AbortError","AbortError")),o()};e.addEventListener("complete",s),e.addEventListener("error",a),e.addEventListener("abort",a)});It.set(e,t)}let Ct={get(e,t,n){if(e instanceof IDBTransaction){if(t==="done")return It.get(e);if(t==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return xe(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function sr(e){Ct=e(Ct)}function $o(e){return Ro().includes(e)?function(...t){return e.apply(kt(this),t),xe(this.request)}:function(...t){return xe(e.apply(kt(this),t))}}function Vo(e){return typeof e=="function"?$o(e):(e instanceof IDBTransaction&&Fo(e),Dt(e,qo())?new Proxy(e,Ct):e)}function xe(e){if(e instanceof IDBRequest)return jo(e);if(pt.has(e))return pt.get(e);const t=Vo(e);return t!==e&&(pt.set(e,t),ct.set(t,e)),t}const kt=e=>ct.get(e);function Wo(e,t,{blocked:n,upgrade:r,blocking:o,terminated:s}={}){const a=indexedDB.open(e,t),u=xe(a);return r&&a.addEventListener("upgradeneeded",c=>{r(xe(a.result),c.oldVersion,c.newVersion,xe(a.transaction),c)}),n&&a.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),u.then(c=>{s&&c.addEventListener("close",()=>s()),o&&c.addEventListener("versionchange",v=>o(v.oldVersion,v.newVersion,v))}).catch(()=>{}),u}const Ho=["get","getKey","getAll","getAllKeys","count"],Ko=["put","add","delete","clear"],ht=new Map;function wn(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(ht.get(t))return ht.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,o=Ko.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(o||Ho.includes(n)))return;const s=async function(a,...u){const c=this.transaction(a,o?"readwrite":"readonly");let v=c.store;return r&&(v=v.index(u.shift())),(await Promise.all([v[n](...u),o&&c.done]))[0]};return ht.set(t,s),s}sr(e=>({...e,get:(t,n,r)=>wn(t,n)||e.get(t,n,r),has:(t,n)=>!!wn(t,n)||e.has(t,n)}));const Go=["continue","continuePrimaryKey","advance"],xn={},Lt=new WeakMap,ar=new WeakMap,Jo={get(e,t){if(!Go.includes(t))return e[t];let n=xn[t];return n||(n=xn[t]=function(...r){Lt.set(this,ar.get(this)[t](...r))}),n}};async function*Uo(...e){let t=this;if(t instanceof IDBCursor||(t=await t.openCursor(...e)),!t)return;t=t;const n=new Proxy(t,Jo);for(ar.set(n,t),ct.set(n,kt(t));t;)yield n,t=await(Lt.get(n)||t.continue()),Lt.delete(n)}function mn(e,t){return t===Symbol.asyncIterator&&Dt(e,[IDBIndex,IDBObjectStore,IDBCursor])||t==="iterate"&&Dt(e,[IDBIndex,IDBObjectStore])}sr(e=>({...e,get(t,n,r){return mn(t,n)?Uo:e.get(t,n,r)},has(t,n){return mn(t,n)||e.has(t,n)}}));const Ce=[];function Yo(e,t=Le){let n=null;const r=new Set;function o(u){if(Cn(e,u)&&(e=u,n)){const c=!Ce.length;for(const v of r)v[1](),Ce.push(v,e);if(c){for(let v=0;v<Ce.length;v+=2)Ce[v][0](Ce[v+1]);Ce.length=0}}}function s(u){o(u(e))}function a(u,c=Le){const v=[u,c];return r.add(v),r.size===1&&(n=t(o,s)||Le),u(e),()=>{r.delete(v),r.size===0&&n&&(n(),n=null)}}return{set:o,update:s,subscribe:a}}var Qo=A('<span style="color: red;" class="svelte-1a77xxn"> </span>'),zo=A('<div class="notification svelte-1a77xxn">Item added to purchased list!</div>'),Xo=A('<button class="plus-button svelte-1a77xxn">+</button>'),Zo=A('<button type="button" class="clear-btn svelte-1a77xxn">✕</button>'),es=A('<li class="svelte-1a77xxn"><button type="button" class="svelte-1a77xxn"> </button></li>'),ts=A('<ul class="dropdown svelte-1a77xxn"></ul>'),ns=A('<button type="button" class="clear-btn svelte-1a77xxn">✕</button>'),rs=A('<li class="svelte-1a77xxn"><button type="button" class="svelte-1a77xxn"> </button></li>'),os=A('<ul class="dropdown svelte-1a77xxn"></ul>'),ss=A('<button class="svelte-1a77xxn">Add to Purchased List</button>'),as=A("<button> </button>"),is=A('<div class="calculator-row svelte-1a77xxn"></div>'),ls=A('<div class="calculator svelte-1a77xxn"><div class="calculator-grid svelte-1a77xxn"><!> <div class="calculator-row full-row svelte-1a77xxn"><button class="calc-button delete svelte-1a77xxn">⌫</button> <button class="calc-button action-button svelte-1a77xxn">OK</button></div></div></div>'),us=A('<div class="input-section svelte-1a77xxn"><div class="input-wrapper svelte-1a77xxn"><label for="item-name" class="svelte-1a77xxn">Item Name:</label> <input type="text" id="item-name" placeholder="Type to search or add item" autocomplete="off" class="svelte-1a77xxn"> <!> <!></div> <div class="input-wrapper svelte-1a77xxn"><label for="category" class="svelte-1a77xxn">Category:</label> <input type="text" id="category" placeholder="Select or type category" autocomplete="off" class="svelte-1a77xxn"> <!> <!></div> <div class="input-row svelte-1a77xxn"><div class="input-wrapper svelte-1a77xxn" style="width: 65%;"><label for="price" class="svelte-1a77xxn">Price:</label> <input type="tel" id="price" readonly="" class="svelte-1a77xxn"></div> <div class="input-wrapper svelte-1a77xxn" style="width: 30%; margin-left: auto;"><label for="quantity" class="svelte-1a77xxn">Quantity:</label> <input type="number" id="quantity" min="1" class="svelte-1a77xxn"></div></div> <div class="input-wrapper svelte-1a77xxn"><label for="date" class="svelte-1a77xxn">Purchase Date:</label> <input type="date" id="date" class="svelte-1a77xxn"></div> <!> <!></div>'),cs=A('<div class="refresh-message svelte-1a77xxn"> </div>'),fs=A('<span class="quantity-box svelte-1a77xxn"> </span>'),ds=A('<button class="delete-btn svelte-1a77xxn">🗑️</button>'),vs=A('<div role="button" tabindex="0"><div class="item-content svelte-1a77xxn"><span class="item-number svelte-1a77xxn"></span> <span class="item-details svelte-1a77xxn"> </span> <!> <span class="item-price svelte-1a77xxn"> </span> <!></div></div>'),_s=A('<div class="purchase-group svelte-1a77xxn"><div class="purchase-header svelte-1a77xxn"><strong class="svelte-1a77xxn"> </strong> <span class="total-amount svelte-1a77xxn"> </span></div> <div class="purchased-items-list svelte-1a77xxn"></div></div>'),ps=A('<li class="svelte-1a77xxn"> </li>'),hs=A('<dialog open class="modal-content svelte-1a77xxn" role="document" aria-labelledby="budget-title"><h3 id="budget-title" class="svelte-1a77xxn">Set New Budget</h3> <input type="number" min="0" placeholder="Enter budget amount" class="svelte-1a77xxn"> <button class="svelte-1a77xxn">Add Budget</button> <h4 class="svelte-1a77xxn">Budget History</h4> <ul class="svelte-1a77xxn"></ul> <button aria-label="Close modal" class="svelte-1a77xxn">Close</button></dialog>'),gs=A('<main class="svelte-1a77xxn"><h1 class="svelte-1a77xxn">Grocery</h1> <div class="budget-info svelte-1a77xxn" role="button" tabindex="0" aria-label="Open budget modal">Budget: <!></div> <!> <!> <!> <h2 class="svelte-1a77xxn">Purchased Items</h2> <!> <!> <!></main>');function ys(e,t){nr(t,!1);const n=No(),r=()=>Po(Te,"$budgetTotal",n);let o=[],s=N([]),a=N(""),u=N(""),c=N(""),v=N(1),b=N(!1),_=N(!1),y=[],g=N([]),h=N([]),I=N(new Date().toISOString().split("T")[0]),R=N(!1),K=N(""),G=!1,w=N(!1),T=N(!0),he=N(!1),le=N({top:"0px",left:"0px"}),j=N(null),Se=N(null),re=N(!1),oe=N(0),se=N([]),Te=Yo(0);async function Pe(){try{o=(await(await fetch("/api/serve_groceries.php?t="+new Date().getTime(),{cache:"no-cache"})).json()).groceries,o=o.sort((d,p)=>d.name.localeCompare(p.name)),y=Array.from(new Set(o.map(d=>d.category))).sort(),f(s,o),f(g,y)}catch(i){console.error("Failed to load groceries data:",i)}}async function z(){return Wo("budget-management",1,{upgrade(i){i.objectStoreNames.contains("purchases")||i.createObjectStore("purchases",{keyPath:"id",autoIncrement:!0}),i.objectStoreNames.contains("groceries")||i.createObjectStore("groceries",{keyPath:"name"}),i.objectStoreNames.contains("budget")||i.createObjectStore("budget",{keyPath:"id",autoIncrement:!0})}})}async function Ge(){const i=await z();if(f(h,await i.getAll("purchases")),navigator.onLine)try{const p=await(await fetch("/api/get_purchases.php")).json();if(p.status==="success"){f(h,p.data);const D=i.transaction("purchases","readwrite");await D.objectStore("purchases").clear();for(const B of l(h))await D.objectStore("purchases").put(B);f(K,"Data has been successfully refreshed from the server."),setTimeout(()=>{f(K,"")},3e3)}}catch(d){console.error("Error fetching purchased items:",d)}}async function Ne(){if(navigator.onLine){const i=await z(),d=await i.getAll("groceries");for(const p of d)try{const B=await(await fetch("/api/update_groceries.php",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(p)})).json();B.status==="success"?(console.log(`Grocery item synced successfully: ${p.name}`),await i.delete("groceries",p.name)):console.error(`Failed to sync item ${p.name}:`,B.message)}catch(D){console.error("Error syncing grocery item:",D)}}else console.warn("Device is offline. Unable to sync groceries.")}window.addEventListener("online",()=>{console.log("Network status: Online. Syncing groceries..."),Ne()}),et(()=>{Pe(),Ge(),Ne(),Je()});function Je(){f(h,l(h).sort((i,d)=>new Date(d.date)-new Date(i.date)))}function ir(){f(s,o),f(b,!0)}function lr(){f(g,y),f(_,!0)}function ur(){setTimeout(()=>{f(b,!1)},200)}function cr(){setTimeout(()=>{f(_,!1)},200)}function fr(){l(a).trim()===""?f(s,o):f(s,o.filter(i=>i.name.toLowerCase().includes(l(a).toLowerCase()))),f(b,l(s).length>0)}function dr(){l(u).trim()===""?f(g,y):f(g,y.filter(i=>i.toLowerCase().includes(l(u).toLowerCase()))),f(_,l(g).length>0)}function vr(i){f(a,i),f(b,!1),pr(i)}function _r(i){f(u,i),f(_,!1)}function pr(i){const d=o.find(p=>p.name.toLowerCase()===i.toLowerCase());d?(f(a,d.name),f(u,d.category),f(c,d.price)):(f(u,""),f(c,"")),f(s,[])}async function hr(){if(l(a)&&l(u)&&l(c)&&l(I)){f(T,!1);const i={name:l(a),category:l(u),price:parseFloat(l(c).replace(/,/g,""))||0,quantity:parseInt(l(v).toString(),10)||1,date:l(I)};if(!o.some(p=>p.name.toLowerCase()===l(a).toLowerCase())){try{const p={name:i.name,category:i.category,price:i.price};await(await z()).put("groceries",p),console.log(`Grocery item added locally: ${p.name}`)}catch(p){console.error("Error adding grocery to IndexedDB:",p)}try{const D=await(await fetch("/api/update_groceries.php",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:i.name,category:i.category,price:i.price})})).json();D.status==="success"?await Pe():console.error(D.message)}catch(p){console.error("Error adding item to groceries:",p)}}try{const p=await fetch("/api/add_purchase.php",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)});await(await z()).put("purchases",i);const B=await p.text();console.log("Raw response:",B);const U=JSON.parse(B);U.status==="success"?console.log("Item added to SQLite database successfully!"):console.error(U.message)}catch(p){console.error("Error adding item to database:",p)}f(h,[...l(h),i]),f(h,l(h).sort((p,D)=>new Date(D.date).getTime()-new Date(p.date).getTime())),ft(-i.price*i.quantity),f(a,""),f(u,""),f(c,""),f(v,1),f(I,new Date().toISOString().split("T")[0]),f(w,!1),f(he,!1),f(R,!0),setTimeout(()=>{f(R,!1),f(T,!0)},3e3)}else alert("Please fill in all fields, including date.")}function gr(i){return l(h).filter(d=>d.date===i).reduce((d,p)=>d+p.price*p.quantity,0).toFixed(2)}function Wt(i){f(j,l(j)===i?null:i),f(Se,l(j))}function Ht(i){!i.target.closest(".purchased-item")&&!i.target.closest(".delete-btn")&&(f(j,null),f(Se,null))}et(()=>{document.addEventListener("click",Ht)}),gn(()=>{document.removeEventListener("click",Ht)});async function yr(i){try{f(h,l(h).filter(B=>B.id!==i));const p=await(await fetch("/api/delete_purchase.php",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:i})})).json();p.status==="success"?console.log("Item deleted successfully."):console.error(p.message),await(await z()).delete("purchases",i)}catch(d){console.error("Error deleting item:",d)}}function br(){return Array.from(new Set(l(h).map(i=>i.date))).sort((i,d)=>new Date(d)-new Date(i))}function Kt(i){return i.replace(/[^\d]/g,"").replace(/\B(?=(\d{3})+(?!\d))/g,",")}function Gt(i){i==="C"?f(c,""):i==="Del"?f(c,l(c).slice(0,-1)):i==="000"?f(c,l(c)+"000"):f(c,l(c)+i),f(c,Kt(l(c)))}function wr(i){f(c,Kt(i.target.value))}function xr(i){f(he,!0);const d=i.target.getBoundingClientRect(),p=document.querySelector(".input-section").getBoundingClientRect();f(le,{top:`${d.bottom-p.top+10}px`,left:`${d.left-p.left}px`}),i.target.blur()}function Jt(i){document.querySelector(".calculator"),!i.target.closest(".calculator")&&!i.target.closest("#price")&&f(he,!1)}function mr(){f(he,!1)}async function Er(i){if(i>0)try{const p=await(await fetch("/api/add_budget.php",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({date:new Date().toISOString().split("T")[0],amount:i})})).json();if(p.status==="success"){const B=(await z()).transaction("budget","readwrite"),U={date:new Date().toISOString().split("T")[0],amount:i};await B.objectStore("budget").put(U),f(se,[...l(se),U]),ft(i),f(re,!1)}else console.error(p.message)}catch(d){console.error("Error adding budget:",d)}}async function Sr(){const d=(await z()).transaction("budget","readonly");f(se,await d.objectStore("budget").getAll()),ft()}function ft(i){i!==void 0?Te.update(d=>d+i):Te.set(l(se).reduce((d,p)=>d+p.amount,0)-l(h).reduce((d,p)=>d+p.price*p.quantity,0))}function Tr(){const i=new EventSource("/api/budget_updates.php");i.onmessage=d=>{const p=JSON.parse(d.data);Te.set(p.total)},i.onerror=()=>{console.error("SSE connection failed."),i.close()}}et(()=>{document.addEventListener("click",Jt),Sr(),Tr()}),gn(()=>{document.removeEventListener("click",Jt)}),Oo();var Ut=gs(),Ue=x(E(Ut),2),Dr=x(E(Ue));V(Dr,()=>r()<0,i=>{var d=Qo(),p=E(d);$(()=>J(p,`Rp ${r().toLocaleString()??""}`)),O(i,d)},i=>{var d=go();$(()=>J(d,`Rp ${r().toLocaleString()??""}`)),O(i,d)});var Yt=x(Ue,2);V(Yt,()=>l(R),i=>{var d=zo();O(i,d)});var Qt=x(Yt,2);V(Qt,()=>!l(w),i=>{var d=Xo();C("click",d,()=>f(w,!0)),O(i,d)});var zt=x(Qt,2);V(zt,()=>l(w),i=>{var d=us(),p=E(d),D=x(E(p),2),B=x(D,2);V(B,()=>l(a),L=>{var P=Zo();C("click",P,()=>f(a,"")),O(L,P)});var U=x(B,2);V(U,()=>l(b),L=>{var P=ts();we(P,5,()=>l(s),be,(Y,F)=>{var Q=es(),ce=E(Q),qe=E(ce);$(()=>J(qe,l(F).name)),C("click",ce,()=>vr(l(F).name)),O(Y,Q)}),O(L,P)});var ue=x(p,2),X=x(E(ue),2),ge=x(X,2);V(ge,()=>l(u),L=>{var P=ns();C("click",P,()=>f(u,"")),O(L,P)});var ye=x(ge,2);V(ye,()=>l(_),L=>{var P=os();we(P,5,()=>l(g),be,(Y,F)=>{var Q=rs(),ce=E(Q),qe=E(ce);$(()=>J(qe,l(F))),C("click",ce,()=>_r(l(F))),O(Y,Q)}),O(L,P)});var q=x(ue,2),Ye=E(q),Z=x(E(Ye),2),dt=x(Ye,2),Qe=x(E(dt),2),Be=x(q,2),vt=x(E(Be),2),Me=x(Be,2);V(Me,()=>l(T),L=>{var P=ss();$(()=>ko(P,"fade-out",!l(T))),C("click",P,hr),O(L,P)});var ze=x(Me,2);V(ze,()=>l(he),L=>{var P=ls(),Y=E(P),F=E(Y);we(F,0,()=>[["7","8","9"],["4","5","6"],["1","2","3"],["C","0","000"]],be,(Cr,kr)=>{var en=is();we(en,5,()=>kr,be,(Lr,Xe)=>{var Ze=as();const Or=zr(()=>`calc-button ${(typeof l(Xe)=="string"&&!["C","000","Del","OK"].includes(l(Xe))?"number":"")??""} svelte-1a77xxn`);var Ar=E(Ze);$(()=>{vn(Ze,l(Or)),J(Ar,l(Xe))}),C("click",Ze,()=>Gt(l(Xe))),O(Lr,Ze)}),O(Cr,en)});var Q=x(F,2),ce=E(Q),qe=x(ce,2);$(()=>fn(P,"style",`top: ${l(le).top??""}; left: ${l(le).left??""};`)),C("click",ce,()=>Gt("Del")),C("click",qe,mr),O(L,P)}),Ie(D,()=>l(a),L=>f(a,L)),C("input",D,fr),C("focus",D,ir),C("blur",D,ur),Ie(X,()=>l(u),L=>f(u,L)),C("input",X,dr),C("focus",X,lr),C("blur",X,cr),Ie(Z,()=>l(c),L=>f(c,L)),C("focus",Z,xr),C("input",Z,wr),Ie(Qe,()=>l(v),L=>f(v,L)),Ie(vt,()=>l(I),L=>f(I,L)),O(i,d)});var Xt=x(zt,4);V(Xt,()=>G,i=>{var d=cs(),p=E(d);$(()=>J(p,l(K))),O(i,d)});var Zt=x(Xt,2);we(Zt,1,br,be,(i,d)=>{var p=_s(),D=E(p),B=E(D),U=E(B);$(()=>J(U,l(d)===new Date().toISOString().split("T")[0]?"Today":l(d)));var ue=x(B,2),X=E(ue);$(()=>J(X,`Total: Rp ${parseFloat(gr(l(d))).toLocaleString()??""}`));var ge=x(D,2);we(ge,5,()=>l(h).filter(ye=>ye.date===l(d)),be,(ye,q,Ye)=>{var Z=vs(),dt=E(Z),Qe=E(dt);Qe.textContent=`${Ye+1}.`;var Be=x(Qe,2),vt=E(Be),Me=x(Be,2);V(Me,()=>l(q).quantity>1,Y=>{var F=fs(),Q=E(F);$(()=>J(Q,l(q).quantity)),O(Y,F)});var ze=x(Me,2),L=E(ze);$(()=>J(L,`Rp ${(l(q).price*l(q).quantity).toLocaleString()??""}`));var P=x(ze,2);V(P,()=>l(Se)===l(q).id,Y=>{var F=ds();C("click",F,Q=>{Q.stopPropagation(),yr(l(q).id)}),O(Y,F)}),$(()=>{fn(Z,"data-id",l(q).id),vn(Z,`purchased-item ${(l(j)===l(q).id?"highlighted":"")??""} svelte-1a77xxn`),J(vt,`${l(q).name??""} - ${l(q).category??""}`)}),C("click",Z,()=>Wt(l(q).id)),C("keydown",Z,Y=>Y.key==="Enter"&&Wt(l(q).id)),O(ye,Z)}),O(i,p)});var Ir=x(Zt,2);V(Ir,()=>l(re),i=>{var d=hs(),p=x(E(d),2),D=x(p,2),B=x(D,4);we(B,5,()=>l(se),be,(ue,X)=>{var ge=ps(),ye=E(ge);$(()=>J(ye,`${l(X).date??""}: Rp ${l(X).amount.toLocaleString()??""}`)),O(ue,ge)});var U=x(B,2);Ie(p,()=>l(oe),ue=>f(oe,ue)),C("click",D,()=>Er(l(oe))),C("click",U,()=>f(re,!1)),O(i,d)}),C("click",Ue,()=>f(re,!0)),C("keydown",Ue,i=>i.key==="Enter"&&f(re,!0)),O(e,Ut),rr()}wo(ys,{target:document.getElementById("app")});"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/service-worker.js").then(e=>{console.log("Service Worker registered with scope: ",e.scope)},e=>{console.error("Service Worker registration failed: ",e)})});window.addEventListener("online",()=>{console.log("Network status: Online. Syncing groceries..."),syncGroceriesWithServer(),fetchPurchasedItems()});
//# sourceMappingURL=index-D2-5EgXD.js.map