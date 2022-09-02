import { RouteRecordRaw } from "vue-router";
import Leads from "../views/Leads.vue";
import Lead from "../views/Lead.vue";

import LeadsIcon from "@/assets/icons/menu/leads.svg"

const leads: RouteRecordRaw[] = [
  {
    path: "/leads",
    name: "Leads",
    component: Leads,
    meta: {
      requiresAuth: true,
      label: "Leads",
      showOnMenu: true,
      icon: LeadsIcon,
    },
  },
  {
    path: "/leads/:id",
    name: "Lead",
    component: Lead,
    props:true,
    meta: { requiresAuth: true },
  },
];

export {leads};
