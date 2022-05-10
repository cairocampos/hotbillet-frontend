import { RouteRecordRaw } from "vue-router";
import Users from "../views/Users.vue";
import CreateUSer from "../views/CreateUser.vue";
import UserDetails from "../views/UserDetails.vue";

import UserIcon from "@/assets/icons/menu/users.svg"

const users: RouteRecordRaw[] = [
  {
    path: "/usuarios",
    name: "Users",
    component: Users,
    meta: {
      requiresAuth: true,
      icon: UserIcon,
      label: "Usuários",
      showOnMenu: true,
    },
  },

  {
    path: "/usuarios/adicionar",
    name: "CreateUser",
    component: CreateUSer,
    meta: {
      requiresAuth: true,
      showOnMenu: false,
    },
  },
  {
    path: "/usuarios/:id/detalhes",
    name: "UserDetails",
    props: true,
    component: UserDetails,
    meta: {
      requiresAuth: true,
      showOnMenu: false,
    },
  },
];

export {users};
