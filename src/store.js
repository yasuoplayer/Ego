import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userMsg:{
      root:1
    },
    socket:''
  },
  mutations: {
    cancellation(state)
    {
      state.userMsg = ''
    },
    setUserMsg(state,data)
    {
      state.userMsg = {...data}
    },
    setSocket(state,socket)
    {
      state.socket = socket
    }
  },
  actions: {

  }
})
