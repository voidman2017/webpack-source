(()=>{"use strict";var e={n:t=>{var r=t&&t.__esModule?()=>t.default:()=>t;return e.d(r,{a:r}),r},d:(t,r)=>{for(var n in r)e.o(r,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:r[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};const t=Vue;var r=e.n(t),n=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"app"}},[t("h1",[e._v(e._s(e.message))]),e._v(" "),t("el-button",{attrs:{type:"primary"}},[e._v("Element UI Button")])],1)};n._withStripped=!0;var o=function(e,t){var r,n="function"==typeof e?e.options:e;if(t&&(n.render=t,n.staticRenderFns=[],n._compiled=!0),r)if(n.functional){n._injectStyles=r;var o=n.render;n.render=function(e,t){return r.call(t),o(e,t)}}else{var a=n.beforeCreate;n.beforeCreate=a?[].concat(a,r):[r]}return{exports:e,options:n}}({name:"App",data:()=>({message:"Hello, Webpack Externals Demo!"})},n);const a=o.exports,s=jQuery;var i=e.n(s);console.log("===debug=== $: ",i()),new(r())({render:e=>e(a)}).$mount("#app")})();