import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import SocialSharing from "vue-social-sharing";

 
Vue.config.productionTip = false
Vue.use(SocialSharing);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
