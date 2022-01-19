import { RouteRecordRaw } from "vue-router";
import Usuarios from "@/views/usuarios/Usuarios.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/empresas",
    name: "Empresas",
    component: Usuarios,
    meta: { requiresAuth: true },
  },
];

export default routes;
