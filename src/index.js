import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCookie from 'vue-cookies'
import VuejsDialog from "vuejs-dialog"
import App from './components/App.vue'
import LeftSideMenu from './components/LeftSideMenu.vue'
import MainContent from './components/MainContent.vue'
import AddEditContact from './components/AddEditContact.vue'
import './fonts.css'

Vue.use(VueCookie);
Vue.use(VueRouter);
Vue.use(VuejsDialog);
Vue.config.productionTip = false

if (!VueCookie.get('contacts')) {
  VueCookie.set('contacts', JSON.stringify([
    {
      fullName: "Lonneke Faber",
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
      fullName: "Don Kooijman",
      firstName: "Don",
      lastName: "Kooijman",
      profilePicture: 'data:image/png;base64,',
      email: "don.kooijman@wonderkind.com",
      mobile: [
        "06-12345678"
      ]
    },
    {
      fullName: "Amar Muric",
      firstName: "Amar",
      lastName: "Muric",
      profilePicture: 'data:image/png;base64,',
      email: "amar.muric@wonderkind.com",
      mobile: [
        "06-12345678"
      ]
    }
  ]), -1, "/");
}

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      components: {
        leftSideMenu: LeftSideMenu
      }   
    }, {
      path: "/contact/:contact_index",
      components: {
        leftSideMenu: LeftSideMenu,
        mainContent: MainContent
      }
    }, {
      path: "/edit/:contact_index",
      components: {
        mainContent: AddEditContact
      }
    }, {
      path: "/addNewContact",
      components: {
        mainContent: AddEditContact
      }
    }
  ]
}); 

new Vue({
  router: router,
  el: '#app',
  render: h => h(App)
});
// new Vue({
//   el: '#app',
//   render: h => h(App)
// }) 
