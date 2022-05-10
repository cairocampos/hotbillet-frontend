import { RouteRecordRaw } from "vue-router";
import Dashboard from '../views/Dashboard.vue';

import DashboardIcon  from '@/assets/icons/menu/dashboard.svg'

const dashboard: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true,
      icon: DashboardIcon,
      showOnMenu: true,
      label: 'Painel'
    },
  },
];

export {dashboard};
