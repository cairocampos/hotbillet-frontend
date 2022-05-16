import axios, {AxiosError} from "axios";
import { IViacep } from "./interfaces/IViacep";
import { useStore } from 'vuex'

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


const store = useStore();
api.interceptors.response.use(function(response) {
  return response;
}, function ({response}: AxiosError) {
  const UNATHORIZED = 401;
  if(response?.status == UNATHORIZED) {
    localStorage.removeItem('hot_token');
    localStorage.removeItem('hot_refresh_token');
    // location.reload
  }
  
  return Promise.reject(error)
});

const fetchCep = async (cep: string) => {
  const { data } = await axios.get<IViacep>(`https://viacep.com.br/ws/${cep}/json/`);
  return data;
}


export { api, auth, fetchCep };
