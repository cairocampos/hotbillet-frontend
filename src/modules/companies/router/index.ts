import { RouteRecordRaw } from "vue-router";
import Companies from "../views/Companies.vue";
import CreateCompany from "../views/CreateCompany.vue";
const routes: RouteRecordRaw[] = [
  {
    path: "/empresas",
    name: "Companies",
    component: Companies,
    meta: {
      requiresAuth: true,
      label: "Empresas",
      showOnMenu: true,
      icon: require("@/assets/icons/menu/companies.svg"),
    },
  },
  {
    path: "/empresas/adicionar",
    name: "CreateCompany",
    component: CreateCompany,
    meta: {
      requiresAuth: true
    },
  },
];

export default routes