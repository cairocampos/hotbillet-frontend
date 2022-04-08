import { Module } from "vuex"
import router from '@/router'
import { RootState } from "@/store/interface"


interface IUserAuth {
    id?:number;
    name:string;
    email:string;
    last_name:string;
    profile:string;
}
interface UsuarioState {
    usuario: IUserAuth
}

// eslint-disable-next-line
const usuarioModule: Module<UsuarioState, RootState> = {
  namespaced:true,
  state: {
    usuario: {} as IUserAuth
  },
  mutations: {
    SET_USUARIO(state,payload) {
      state.usuario = Object.assign(state.usuario, payload)
    }
  },
  actions: {
    logout({commit}) {
      localStorage.removeItem('hot_token');
      localStorage.removeItem('hot_refresh_token');
      commit('SET_USUARIO', {
        id:"",
        name: "",
        email:"",
        last_name:"",
        profile:""
      });
      router.push({path:"/login"})
    },
    defineUsuario({dispatch}, data: {jwt_access:string;jwt_refresh:string;}) {
      localStorage.setItem('hot_token', data.jwt_access);
      localStorage.setItem('hot_refresh_token', data.jwt_refresh);

      dispatch('getJwtData');
    },
    getJwtData({commit}) {
      const token = localStorage.getItem('hot_token');
      if(token) {
        const [,data,] = token.split('.');
        commit('SET_USUARIO', JSON.parse(atob(data)));
      }
    }
  },
  getters: {
    getNomeUsuario: state => {
      return  state.usuario.name;
    }
  }
}

export default usuarioModule;