import Vue from 'vue'
import VueCookie from 'vue-cookie'
import App from './App.vue'
import router from './router'
import "leaflet/dist/leaflet.css";

Vue.use(VueCookie);

export const eventBus = new Vue();

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')