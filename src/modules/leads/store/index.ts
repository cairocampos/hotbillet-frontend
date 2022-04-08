import state, {IState} from './state'
import mutations from './mutations'
import { Module } from 'vuex'

export default {
  namespaced: true,
  state,
  mutations
} as Module<any, IState>