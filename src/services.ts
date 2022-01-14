import axios from 'axios';
const auth = {
    token(): string|null {
        return localStorage.getItem('hot_token')
    }
}

const api = axios.create({
    baseURL: process.env.NODE_ENV == 'production' ? 'http://localhost:8081/api' : 'http://homolog.hotbillet.com.br:8090/api'
});

api.interceptors.request.use(function(config) {
    const token = auth.token();
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, function error(error) {
    return Promise.reject(error);
})

// instance.interceptors.response.use(function(response) {
//     return response;
// }, function (error) {
//     return Promise.reject(error)
// });
export { api, auth };