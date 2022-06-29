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
      localStorage.removeItem('@Hotbillet:token');
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
    defineUsuario({dispatch}, data: {token_access:string;token_refresh:string;}) {
      localStorage.setItem('@Hotbillet:token', data.token_access);
      localStorage.setItem('hot_refresh_token', data.token_refresh);

      dispatch('getJwtData');
    },
    getJwtData({commit}) {
      const token = localStorage.getItem('@Hotbillet:token');
      if(token) {
        const [,data,] = token.split('.');
        // commit('SET_USUARIO', JSON.parse(atob(data)));
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