import Vue from 'vue'
import App from './App.vue'
import router from './router'
import myComps from './components/index.js'
import store from './store'
import './plugins/element.js'

Vue.config.productionTip = false
Vue.use(myComps)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

