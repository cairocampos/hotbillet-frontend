import { RouteRecordRaw } from "vue-router";
import Login from "../views/Login.vue";
const authRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "Login",
    components: {
      login: Login,
    },
  },
];

export  {authRoutes}