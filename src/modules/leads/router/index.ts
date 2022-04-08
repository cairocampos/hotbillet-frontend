import { RouteRecordRaw } from "vue-router";
import Leads from "../views/Leads.vue";
import Lead from "../views/Lead.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/leads",
    name: "Leads",
    component: Leads,
    meta: {
      requiresAuth: true,
      label: "Leads",
      showOnMenu: true,
      icon: "headset",
    },
  },
  {
    path: "/leads/:id",
    name: "Lead",
    component: Lead,
    meta: { requiresAuth: true },
  },
];

export default routes;
