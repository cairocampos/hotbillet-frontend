import { Module } from "vuex"

/* eslint-disable */
const alertaModule: Module<any, any> = {
    namespaced:true,
    state: {
        alert: { 
            text:"",
            type: "success",
            show:false,
            duration:3000
        }
    },
    mutations: {
        UPDATE_ALERTA(state,payload) {
            state.alert = Object.assign({},state.alert, payload)
        }
    },
    getters: {
        alerta(state:any) {
            return state.alert;
        }
    }
}

export default alertaModule;