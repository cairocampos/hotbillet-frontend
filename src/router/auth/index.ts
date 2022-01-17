import { RouteRecordRaw } from "vue-router";
import Login from "@/views/Auth/Login.vue";
const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "Login",
    components: {
      login: Login,
    },
  },
];

export default routes;
