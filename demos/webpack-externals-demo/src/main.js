import Vue from 'vue'
// 删除这两行，因为我们现在通过 CDN 引入 Element UI
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import $ from 'jquery';
console.log('===debug=== $: ', $);

// Vue.use(ElementUI) // 删除这行，因为全局的 ELEMENT 会自动安装

new Vue({
  render: h => h(App)
}).$mount('#app')