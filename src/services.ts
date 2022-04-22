import axios from "axios";
import { IViacep } from "./interfaces/IViacep";
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

const fetchCep = async (cep: string) => {
  const { data } = await axios.get<IViacep>(`https://viacep.com.br/ws/${cep}/json/`);
  return data;
}


export { api, auth, fetchCep };
