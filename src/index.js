import Vue from 'vue'
import App from './components/App.vue'
import VueCookie from 'vue-cookies'
import './fonts.css'

Vue.use(VueCookie);
Vue.config.productionTip = false

if (!VueCookie.get('contacts')) {
  VueCookie.set('contacts', JSON.stringify([
    {
      name: "Lonneke Faber",
      email: "lonneke.faber@wonderkind.com",
      mobile: [
        "06-12345678"
      ]
    },
    {
      name: "Don Kooijman",
      email: "don.kooijman@wonderkind.com",
      mobile: [
        "06-12345678"
      ]
    },
    {
      name: "Amar Muric",
      email: "amar.muric@wonderkind.com",
      mobile: [
        "06-12345678"
      ]
    }
  ]));
}



new Vue({
  el: '#app',
  render: h => h(App)
})
