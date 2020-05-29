import Vue from 'vue'
//import Vuex from 'vuex'
import App from './App.vue'
//import Test from './Test.vue'

import store from './store'

Vue.config.productionTip = false

new Vue({
  	render: h => h(App),
  	store
}).$mount('#app')
