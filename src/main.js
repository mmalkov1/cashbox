import Vue from 'vue'
import store from './store/store'
import App from './components/App.vue'
import VueRouter from 'vue-router'
import Operations from './components/operations.vue'
import Datepicker from 'vuejs-datepicker'
import addOperation from './components/addOperation.vue'
import editOperation from './components/editOperation.vue'
import FontAwesome from '@fortawesome/fontawesome-free'

Vue.use(VueRouter)
Vue.use(FontAwesome)

Vue.component('operations', Operations)
Vue.component('addOperation', addOperation)
Vue.component('datepicker', Datepicker)
Vue.component('editOperation', editOperation)

new Vue({
  store,
  el: '#app',
  render: h => h(App)
})
