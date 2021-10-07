import { createStore } from 'vuex'
import usuario from './modules/usuario'
import alerta from './modules/alerta'

export default createStore({
  modules: {
    usuario,
    alerta
  }
})
