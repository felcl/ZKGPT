import { createStore } from 'vuex'

// 创建一个新的 store 实例
export const store = createStore({
  state () {
    return {
      address: window.localStorage.getItem('address') || '',
      token: window.localStorage.getItem('token') || '',
      leftMenu: false
    }
  },
  mutations: {
    SETADDRESS (state,address) {
      window.localStorage.setItem('address',address)
      if(!address){
        window.localStorage.setItem('token','')
        state.token = ''
      }
      state.address = address
    },
    SETLEFTMENU (state,leftMenu){
      state.leftMenu = leftMenu
    },
    SETTOKEN (state,token){
      window.localStorage.setItem('token',token)
      state.token = token
    },
  }
})
