import { Module } from "vuex"
import router from '@/router'

// eslint-disable-next-line
const usuarioModule: Module<any, any> = {
    namespaced:true,
    state: {
        usuario: {
            name: "",
            email:""
        }
    },
    mutations: {
        SET_USUARIO(state,payload) {
            state.usuario = payload
        }
    },
    actions: {
        resetUsuario({commit}) {
            commit('SET_USUARIO', {
                name: "",
                email:""
            });
        },
        logout() {
            router.push({path:"/login"})
        }
    }
}

export default usuarioModule;