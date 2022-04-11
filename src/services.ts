import axios from "axios";
const auth = {
  token(): string | null {
    return localStorage.getItem("hot_token");
  },
};

const api = axios.create({
  baseURL: "/api",
});

api.interceptors.request.use(
  function(config) {
    const token = auth.token();
    if (token && config?.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function error(error) {
    return Promise.reject(error);
  }
);

// instance.interceptors.response.use(function(response) {
//     return response;
// }, function (error) {
//     return Promise.reject(error)
// });
export { api, auth };
