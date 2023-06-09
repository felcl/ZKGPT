import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
// 创建一个新的 store 实例
export const store = createStore({
  state () {
    return {
      address:'',
      token:'',
      leftMenu: false
    }
  },
  mutations: {
    SETADDRESS (state,address) {
      // window.localStorage.setItem('address',address)
      if(!address){
        window.localStorage.setItem('token','')
        state.token = ''
      }
      state.address = address.toLowerCase()
    },
    SETLEFTMENU (state,leftMenu){
      state.leftMenu = leftMenu
    },
    SETTOKEN (state,token){
      window.localStorage.setItem('token',token)
      state.token = token
    },
  },
  plugins: [createPersistedState()]
})
