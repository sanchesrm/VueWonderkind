import Vue from 'vue'
import App from './components/App.vue'
import VueCookie from 'vue-cookies'
import './fonts.css'

Vue.use(VueCookie);
Vue.config.productionTip = false

if (!VueCookie.get('contacts')) {
  VueCookie.set('contacts', JSON.stringify([
    {
      firstName: "Lonneke",
      lastName: "Faber",
      email: "lonneke.faber@wonderkind.com",
      mobile: [
        "06-12345678"
      ]
    },
    {
      firstName: "Don",
      lastName: "Kooijman",
      email: "don.kooijman@wonderkind.com",
      mobile: [
        "06-12345678"
      ]
    },
    {
      firstName: "Amar",
      lastName: "Muric",
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
