import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import baseComponent from './common/components/basic'
import businessComponent from './common/components/business'

Vue.use(baseComponent)
Vue.use(businessComponent)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
