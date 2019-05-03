import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	loggedin: false,
    api: (`http://${window.location.hostname}:3000`)
  },
  mutations: {
  	login_impl(state){
  		state.loggedin = true;
  	}
  },
  actions: {
  	login(){
  		commit()
  	}
  }
})
