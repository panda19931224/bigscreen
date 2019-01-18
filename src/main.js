import Vue from 'vue'
import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import App from './App'
import router from './router'
import store from './vuex/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { sync } from 'vuex-router-sync'
import './styles/index.scss' // global css
import UtilsPlugin from './assets/utils'
import HttpPlugin from './http/Index'
import VCharts from 'v-charts'
Vue.config.productionTip = false
// plugins
Vue.use(UtilsPlugin)
Vue.use(VCharts)
Vue.use(HttpPlugin)
Vue.use(ElementUI)
router.beforeEach((to, from, next) => {
  // 通过vuex state获取当前的token是否存在
  if (store.state.user.userInfo && store.state.user.userInfo.token) {
    setTimeout(next(), 20)
  } else if (to.name !== 'Login') {
    next({ name: 'Login' })
  } else {
    setTimeout(next, 20)
  }
})
router.afterEach((to) => {
})
sync(store, router)
/* eslint-disable no-new */
// global
window.$globalHub = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
