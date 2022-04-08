import { RouteRecordRaw } from "vue-router";
import Login from "../views/Login.vue";
const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "Login",
    components: {
      login: Login,
    },
  },
];

export default routes