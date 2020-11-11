import Vue from 'vue'
import App from './App.vue'
import  store  from './store/index';
import VueLazyload from 'vue-lazyload'


Vue.config.productionTip = false
Vue.use(VueLazyload)

new Vue({
  store: store,
  render: h => h(App)
}).$mount('#app')
