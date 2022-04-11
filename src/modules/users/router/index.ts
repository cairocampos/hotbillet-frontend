import { RouteRecordRaw } from "vue-router";
import Users from "../views/Users.vue";
import CreateUSer from "../views/CreateUser.vue";
import UserDetails from "../views/UserDetails.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/usuarios",
    name: "Users",
    component: Users,
    meta: {
      requiresAuth: true,
      icon: require("@/assets/icons/menu/users.svg"),
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

export default routes;
