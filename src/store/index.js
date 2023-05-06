import { createStore } from 'vuex'

// 创建一个新的 store 实例
export const store = createStore({
  state () {
    return {
      address: '',
      token: '',
      leftMenu: false
    }
  },
  mutations: {
    SETADDRESS (state,address) {
      state.address = address
    },
    SETLEFTMENU (state,leftMenu){
      state.leftMenu = leftMenu
    },
    SETTOKEN (state,token){
      state.token = token
    },
  }
})
