import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userMsg:{}
  },
  mutations: {
    cancellation(state)
    {
      state.userMsg = ''
    }
  },
  actions: {

  }
})
