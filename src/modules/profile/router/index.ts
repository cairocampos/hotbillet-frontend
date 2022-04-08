import { RouteRecordRaw } from "vue-router";
import Profile from "../views/Profile.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/perfil",
    name: "Profile",
    component: Profile,
    meta: { requiresAuth: true },
  },
];

export default routes;
