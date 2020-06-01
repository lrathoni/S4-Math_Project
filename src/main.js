import Vue from 'vue'
import VModal from 'vue-js-modal'
//import Vuex from 'vuex'
//import App from './App.vue'
import Test from './Test.vue'

import store from './store'

Vue.config.productionTip = false

Vue.use(VModal)

new Vue({
  	render: h => h(Test),
  	store
}).$mount('#app')
