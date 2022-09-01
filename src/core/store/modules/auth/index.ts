import {useRouter} from "vue-router";
import { api } from "@/core/services/api/base";
import { defineStore } from "pinia";
import { ref } from "vue";

interface User {
  name: string
  email: string
}
export interface Auth {
  token: string;
  user: User
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User>();
  const loading = ref(false)
  const tokenName = '@Hotbillet:token'

  const setData = (data: Auth) => {
    localStorage.setItem(tokenName, data.token)
    user.value = data.user
  }

  const fetchUser = async () => {
    loading.value = true
    const {data} = await api.get('/user')
    user.value = data;
    loading.value = false
  }

  const checkAuth = () => {
    const token = localStorage.getItem(tokenName);
    if(token) {
      fetchUser();
    }
  }

  const router = useRouter()
  const logout = async () => {
    await api.post('/logout')
    user.value = {} as User;
    localStorage.removeItem(tokenName)
    router.push('/login')
  }

  return {
    user,
    setData,
    checkAuth,
    loading,
    logout
  }
})