import { RouteRecordRaw } from "vue-router";
import Mensagens from "@/views/mensagens/Mensagens.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/mensagens",
    name: "Mensagens",
    component: Mensagens,
    meta: { requiresAuth: true },
  },
];

export default routes;
