import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import SocialSharing from "vue-social-sharing";
import VueLogger from 'vuejs-logger';

const isProduction = process.env.NODE_ENV === 'production';

const options = {
    isEnabled: true,
    logLevel : isProduction ? 'error' : 'debug',
    stringifyArguments : false,
    showLogLevel : true,
    showMethodName : true,
    separator: '|',
    showConsoleColors: true
};

Vue.use(VueLogger, options);
 
Vue.config.productionTip = false
Vue.use(SocialSharing);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
