import Vue from 'vue'
import App from './App.vue'
import PortalVue from 'portal-vue'
import store from './store'
import '@mdi/font/css/materialdesignicons.css'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.config.productionTip = false;

Vue.use(Buefy);
Vue.use(PortalVue);

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
