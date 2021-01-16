import Vue from 'vue'
import vuetify from './plugins/vuetify'
import Vuex from 'vuex'
import VueParticles from 'vue-particles'
import VueClipboard from 'vue-clipboard2'

import App from './App.vue'
import { store } from './store/store'
import './firebase'

Vue.config.productionTip = false
VueClipboard.config.autoSetContainer = true

Vue.use(Vuex)
Vue.use(VueParticles)
Vue.use(VueClipboard)


new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
