import { RouteRecordRaw } from "vue-router";
import Agenda from "@/views/agenda/Agenda.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/agenda",
    name: "Agenda",
    component: Agenda,
    meta: { requiresAuth: true },
  },
];

export default routes;
