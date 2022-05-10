import { RouteRecordRaw } from "vue-router";
import Profile from "../views/Profile.vue";

const profile: RouteRecordRaw[] = [
  {
    path: "/perfil",
    name: "Profile",
    component: Profile,
    meta: { requiresAuth: true },
  },
];

export {profile};
