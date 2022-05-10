import { RouteRecordRaw } from "vue-router";
import Messages from "../views/Messages.vue";

import MessagesIcon from "@/assets/icons/menu/messages.svg"
const messages: RouteRecordRaw[] = [
  {
    path: "/mensagens",
    name: "Messages",
    component: Messages,
    meta: {
      requiresAuth: true,
      label: "Mensagens",
      icon: MessagesIcon,
      showOnMenu: true,
    },
  },
];

export {messages};
