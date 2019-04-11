// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/font/iconfont.css'
import VueClipboard from 'vue-clipboard2'
// import $ from 'jquery'
import VueResource from 'vue-resource'

Vue.use(VueClipboard)
Vue.use(ElementUI)
Vue.use(VueResource)
// Vue.use($)
Vue.config.productionTip = false
Vue.http.options.emulateHTTP = true
Vue.http.options.emulateJSON = true
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
