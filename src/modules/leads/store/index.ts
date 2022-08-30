import state, {IState} from './state'
import mutations from './mutations'

interface Root {
  test: false
}

export default {
  namespaced: true,
  state,
  mutations
}