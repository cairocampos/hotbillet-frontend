import * as types from './mutation-types'
import {IState} from './state'

export default {
  [types.ADD_ITEM](state: IState, payload:boolean): void {
    state.test = payload;
  }
}