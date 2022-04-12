import { RouteRecordRaw } from "vue-router";
import Notifications from "../views/Notifications.vue";
const routes: RouteRecordRaw[] = [
  {
    path: "/notificacoes",
    name: "Notifications",
    component: Notifications
  },
];

export default routes