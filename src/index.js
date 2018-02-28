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
      profilePicture: 'data:image/png;base64,',
      email: "lonneke.faber@wonderkind.com",
      mobile: [
        "06-12345678",
        "98-76543210"
      ]
    },
    {
      firstName: "Don",
      lastName: "Kooijman",
      profilePicture: 'data:image/png;base64,',
      email: "don.kooijman@wonderkind.com",
      mobile: [
        "06-12345678"
      ]
    },
    {
      firstName: "Amar",
      lastName: "Muric",
      profilePicture: 'data:image/png;base64,',
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
