if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,c)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(i[r])return;let o={};const d=e=>n(e,r),t={module:{uri:r},exports:o,require:d};i[r]=Promise.all(s.map((e=>t[e]||d(e)))).then((e=>(c(...e),o)))}}define(["./workbox-1ea6f077"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"api/groceries.json",revision:"ec4adb38dd3ea48dc890bd02a21eeb70"},{url:"assets/index-BbPGqDxY.js",revision:null},{url:"assets/index-CTgEN0Q8.css",revision:null},{url:"favicon.png",revision:"cff8c34f2fe29bd95cb35d1c56cf97e3"},{url:"favicon.svg",revision:"b19c01b4e85f7c828884aa0f44447aca"},{url:"icons/icon-192x192.png",revision:"cff8c34f2fe29bd95cb35d1c56cf97e3"},{url:"icons/icon-512x512.png",revision:"400e417bdc918074109a30dd41b55d0b"},{url:"index.html",revision:"572e910d370ca3ad10005ca8e3318928"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"manifest.webmanifest",revision:"121ba203d64fd531859994de5d8a611b"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute(/^https:\/\/.*\//,new e.NetworkFirst({cacheName:"my-runtime-cache",plugins:[new e.ExpirationPlugin({maxEntries:100,maxAgeSeconds:2592e3})]}),"GET")}));
//# sourceMappingURL=sw.js.map
