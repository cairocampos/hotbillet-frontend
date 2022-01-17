import { RouteRecordRaw } from "vue-router";
import Leads from "@/views/leads/Leads.vue";
import Lead from "@/views/leads/Lead.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/leads",
    name: "Leads",
    component: Leads,
    meta: { requiresAuth: true },
  },
  {
    path: "/leads/:id",
    name: "Lead",
    component: Lead,
    meta: { requiresAuth: true },
  },
];

export default routes;
