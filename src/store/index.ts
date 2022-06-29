import { createStore, useStore as baseUseStore, Store, Module } from "vuex";
import usuario from "./modules/usuario";
import alerta from "./modules/alerta";
import auth from "./modules/auth";
import { InjectionKey } from "vue";
import { RootState } from "./rootState";

export const key: InjectionKey<Store<RootState>> = Symbol();

export const store = createStore<RootState>({
  strict: import.meta.env.NODE_ENV !== 'production',
  modules: {
    usuario,
    alerta,
    auth
  },
});

export function useStore() {
  return baseUseStore(key)
}