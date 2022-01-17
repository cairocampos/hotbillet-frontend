import { RouteRecordRaw } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
];

export default routes;
