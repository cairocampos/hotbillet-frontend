import { RouteRecordRaw } from "vue-router";
import Notifications from "../views/Notifications.vue";
const notifications: RouteRecordRaw[] = [
  {
    path: "/notificacoes",
    name: "Notifications",
    component: Notifications
  },
];

export {notifications}