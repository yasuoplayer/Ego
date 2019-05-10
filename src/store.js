import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userMsg:'',
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
    },
    updateMoney(state,money)
    {
      state.userMsg.money = money
    }    
  },
  actions: {

  }
})
