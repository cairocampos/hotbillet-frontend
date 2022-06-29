import { Action, ActionTree, Module, Store, useStore } from "vuex"
import router from '@/router'
import { RootState } from "@/store/interface"
import { api } from "@/services/api";

type User = {
  id:number;
  name:string;
  email:string;
}

type SignInCredentials = {
  email:string;
  password:string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User
}

const authModule: Module<AuthState, RootState> = {
  namespaced:true,
  state: {
    isAuthenticated: false,
    user: {} as User
  },
  mutations: {
    setUser(store, payload: User) {
      store.user = payload;
    },
    setIsAuthenticated(store, payload: boolean) {
      store.isAuthenticated = payload;
    }
  },
  actions: {
    login({commit}, {email, password} : SignInCredentials) {
      return api.post<{token:string; user: User}>('/login', {
        email,
        password
      }).then(response => {
        const {data: { user, token }} = response;
        commit('setUser', user)
        commit('setIsAuthenticated', token)
        localStorage.setItem('@Hotbillet:token', token);
        router.push({path:"/"})
      }).catch(error => {
        throw error
      })
    },
    logout({commit}) {
      return api.post('/logout')
        .then(() => {
          localStorage.removeItem('@Hotbillet:token');
          localStorage.removeItem('hot_refresh_token');
          commit('setUser', {});
          router.push({path:"/login"})
        })
    },
    setUser({commit}) {
      return api.get('/user')
        .then(response => {
          commit('setUser', response.data);
        })
    }
  },
  getters: {
    getNomeUsuario: state => {
      return  state.user.name;
    }
  }
}

export default authModule;
