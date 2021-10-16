import { createStore } from 'vuex'
import usuario from './modules/usuario'
import alerta from './modules/alerta'

export default createStore({
  state: {
    menuAtivo:false
  },
  mutations: {
    TOGGLE_MENU(state) {
      state.menuAtivo = !state.menuAtivo;
    }
  },
  modules: {
    usuario,
    alerta
  }
})
