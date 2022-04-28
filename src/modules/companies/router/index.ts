import { RouteRecordRaw } from "vue-router";
import Companies from "../views/Companies.vue";
import CreateCompany from "../views/CreateCompany.vue";
import CompanyDetails from "../views/CompanyDetails.vue";
import UpdateCompany from "../views/UpdateCompany.vue";
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
      requiresAuth: true,
    },
  },
  {
    path: "/empresas/:id/editar",
    name: "UpdateCompany",
    component: UpdateCompany,
    props:true,
    meta: {
      requiresAuth:true
    }
  },
  {
    path: "/empresas/:id/detalhes",
    name: "CompanyDetails",
    component: CompanyDetails,
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
];

export default routes