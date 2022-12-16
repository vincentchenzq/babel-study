import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import baseComponent from './common/components/basic'
import businessComponent from './common/components/business'
import constant from './common/constants'

Vue.use(ViewUI)
Vue.use(baseComponent)
Vue.use(businessComponent)
// 还有directives mixins filters
Vue.config.productionTip = false

Vue.prototype.$constant = constant
// 还有utils
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
