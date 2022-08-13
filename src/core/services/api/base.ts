import axios, {AxiosError} from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const auth = {
  token(): string | null {
    return localStorage.getItem("@Hotbillet:token");
  },
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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


// const store = useStore();
api.interceptors.response.use(function(response) {
  return response;
}, function (error: AxiosError) {
  const UNATHORIZED = 401;
  if(error.response?.status == UNATHORIZED) {
    localStorage.removeItem('@Hotbillet:token');
    router.push('/')
    // location.reload
  }
  
  return Promise.reject(error)
});

export { api };
