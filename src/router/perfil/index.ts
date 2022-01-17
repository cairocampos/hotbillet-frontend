import { RouteRecordRaw } from "vue-router";
import Perfil from "@/views/perfil/Perfil.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/perfil",
    name: "Perfil",
    component: Perfil,
    meta: { requiresAuth: true },
  },
];

export default routes;
