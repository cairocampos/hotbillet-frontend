import router from "@/router";
import axios, {AxiosError} from "axios";

const api = axios.create({
  baseURL: "/api",
});

api.interceptors.request.use(
  function(config) {
    const token = localStorage.getItem('@Hotbillet:token');
    if (token && config?.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function error(error) {
    return Promise.reject(error);
  }
);

type FailedRequestQueue = {
  onSuccess: (token:string) => void;
  onFailure: (error: AxiosError) => void
}

let isRefreshing = false;
let failedRequestsQueue: FailedRequestQueue[] = [];
api.interceptors.response.use(function(response) {
  return response;
}, function (error: AxiosError) {
  const UNATHORIZED = 401;
  if(error.response?.status == UNATHORIZED) {
    const originalConfig = error.config
    const refreshToken = localStorage.getItem('hot_refresh_token');
    if(!isRefreshing) {
      isRefreshing = true;
      api.post('/refresh-token', {
        refreshToken
      }).then(response => {
        const { token, refreshToken } = response.data

        localStorage.setItem('@Hotbillet:token', token)
        localStorage.setItem('hot_refresh_token', refreshToken)

        failedRequestsQueue.forEach(request => request.onSuccess(token))
        failedRequestsQueue = []
      }).catch((error) => {
        failedRequestsQueue.forEach(request => request.onFailure(error))
        failedRequestsQueue = []
        localStorage.removeItem("@Hotbillet:token")
        localStorage.removeItem("hot_refresh_token")
        router.push('/login')
      })
      .finally(() => {
        isRefreshing = false;
      })
    }

    return new Promise((resolve, reject) => {
      failedRequestsQueue.push({
        onSuccess: (token:string) => {
          // @ts-ignore
          originalConfig.headers['Authorization'] = `Bearer ${token}`;
          resolve(api(originalConfig))
        },
        onFailure: (error: AxiosError) => {
          return reject(error);
        }
      })
    })
  } else {
    // localStorage.removeItem("@Hotbillet:token")
    // localStorage.removeItem("hot_refresh_token")
    // router.push('/login')
    return Promise.reject(error)
  }
});

export {
  api
}
