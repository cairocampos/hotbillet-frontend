import { Module } from "vuex"
import router from '@/router'

// eslint-disable-next-line
const usuarioModule: Module<any, any> = {
    namespaced:true,
    state: {
        usuario: {
            id:"",
            name: "",
            email:"",
            last_name:"",
            profile:"",
            phone:""
        }
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