import Vue from 'vue'
import App from './App.vue'
import GridVue2 from './components/GridVue/grid-vue'

Vue.config.productionTip = false
Vue.component('gridvue2', GridVue2)
new Vue({
  render: h => h(App),
}).$mount('#app')
