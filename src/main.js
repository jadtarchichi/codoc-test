import Vue from 'vue'
import App from './App.vue'
import SmartTable from 'vuejs-smart-table'
import VModal from 'vue-js-modal/dist/ssr.nocss'

import 'vue-js-modal/dist/styles.css'

Vue.use(VModal)
Vue.use(SmartTable)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
