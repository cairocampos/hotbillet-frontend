import axios, {AxiosPromise} from 'axios';
const auth = {
    loggedIn(): boolean {
        return localStorage.getItem('hot_token') ? true : false;
    }
}

const api = axios.create({
    baseURL: process.env.NODE_ENV == 'production' ? 'http://localhost:8081/api' : 'http://homolog.hotbillet.com.br:8090/api'
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
export { api, auth };