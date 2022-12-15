import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import baseComponent from './common/components/basic'
import businessComponent from './common/components/business'
import constant from './common/constants'

Vue.use(baseComponent)
Vue.use(businessComponent)
Vue.config.productionTip = false

Vue.prototype.$constant = constant
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
