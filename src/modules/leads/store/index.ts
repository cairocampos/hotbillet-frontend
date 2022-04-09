import state, {IState} from './state'
import mutations from './mutations'
import { Module } from 'vuex'

interface Root {
  test: false
}

export default {
  namespaced: true,
  state,
  mutations
} as Module<Root, IState>