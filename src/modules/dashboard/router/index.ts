import { RouteRecordRaw } from "vue-router";
import Dashboard from '../views/Dashboard.vue';
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true,
      icon: require('@/assets/icons/menu/dashboard.svg'),
      showOnMenu: true,
      label: 'Painel'
    },
  },
];

export default routes;
