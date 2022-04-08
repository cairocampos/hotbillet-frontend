import { createStore } from "vuex";
import usuario from "./modules/usuario";
import alerta from "./modules/alerta";
import { api } from "@/services";
import { IProfile } from "@/interfaces/IUser";

export const useDefaultStore = createStore({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    menuAtivo: false,
    spec: {
      profiles: [] as IProfile[],
    },
  },
  mutations: {
    TOGGLE_MENU(state) {
      state.menuAtivo = !state.menuAtivo;
    },
    UPDATE_SPEC(state, payload) {
      state.spec = Object.assign(state.spec, payload);
    },
  },
  actions: {
    async loadSpec({ commit }) {
      const profilesPromise = api.get("/users/profiles");
      const [profilesResponse] = await Promise.all([profilesPromise]);
      commit("UPDATE_SPEC", { profiles: profilesResponse.data.profiles });
    },
  },
  modules: {
    usuario,
    alerta,
  },
});
