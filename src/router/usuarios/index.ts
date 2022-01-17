import { RouteRecordRaw } from "vue-router";
import Usuarios from "@/views/usuarios/Usuarios.vue";
import AdicionarUsuario from "@/views/usuarios/AdicionarUsuario.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/usuarios",
    name: "Usuarios",
    component: Usuarios,
    meta: { requiresAuth: true },
  },

  {
    path: "/usuarios/adicionar",
    name: "AdicionarUsuario",
    component: AdicionarUsuario,
    meta: { requiresAuth: true },
  },
];

export default routes;
