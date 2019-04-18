import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueLazyload from 'vue-lazyload'
import axios from 'axios'
Vue.config.productionTip = false
Vue.prototype.$axios =axios
Vue.use(ElementUI)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./components/imgs/error.jpg'),
  loading: require('./components/imgs/loading.gif'),
  attempt: 1
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
