import { RouteRecordRaw } from "vue-router";
import Dashboard from '../views/Dashboard.vue';
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true,
      icon: 'chart-pie',
      showOnMenu: true,
      label: 'Painel'
    },
  },
];

export default routes;
