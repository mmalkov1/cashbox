import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //host: 'http://185.25.117.32:3012',
    host: 'localhost:3012',
    role: 2,
    userAuth: false,    
  },
  mutations: {
    setRoleUser (state, value) {
      state.role = +value;
    },
    setAuthUser (state, value) {
      state.userAuth = value;
    }
  }
  
})