import axios, {AxiosPromise} from 'axios';
const auth = {
    loggedIn() {
        const token = localStorage.getItem('token');
        return token ?? false;
    }
}

const instance = axios.create({
    baseURL: process.env.NODE_ENV == 'production' ? 'http://localhost:8081/api' : 'http://localhost:8081/api'
});

// instance.interceptors.request.use(function(config) {
//     let token = auth.loggedIn();
//     if(token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
// }, function error(error) {
//     return Promise.reject(error);
// })

// instance.interceptors.response.use(function(response) {
//     return response;
// }, function (error) {
//     return Promise.reject(error)
// });

const api = {
    get(uri: string, params?: any):AxiosPromise {
        return instance.get(uri, {params})
    },

    post(uri:string, data:any): AxiosPromise {
        return instance.post(uri, data)
    },

    put(uri:string, data:any): AxiosPromise {
        return instance.put(uri, data)
    },

    delete(uri:string): AxiosPromise {
        return instance.delete(uri)
    }
}

export { api, auth };