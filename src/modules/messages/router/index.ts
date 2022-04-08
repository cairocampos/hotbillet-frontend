import { RouteRecordRaw } from "vue-router";
import Messages from "../views/Messages.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/mensagens",
    name: "Messages",
    component: Messages,
    meta: {
      requiresAuth: true,
      label: "Mensagens",
      icon: "comments",
      showOnMenu:true
    },
  },
];

export default routes;
