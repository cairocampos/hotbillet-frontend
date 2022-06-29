import { Store } from "vuex";
import { RootState } from "./store/rootState";

declare module '@vue/runtime-core' {
  interface State extends RootState {}
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}