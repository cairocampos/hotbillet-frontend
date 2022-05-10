import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// import { auth } from "@/services";
// import { useDefaultStore } from "@/store";

//routes
import {authRoutes} from "../modules/auth/router";
import {dashboard} from "../modules/dashboard/router";
import {users} from "../modules/users/router";
import {products} from "../modules/products/router";
import {leads} from "../modules/leads/router";
import {messages} from "../modules/messages/router";
import {profile} from "../modules/profile/router";
import {notifications} from "../modules/notifications/router";
import {companies} from "../modules/companies/router";

import Teste from '@/views/Teste.vue'
import NotFoundComponent from '@/views/404.vue'
import { useDefaultStore } from "../store";
import { auth } from "../services";

const routes: Array<RouteRecordRaw> = [
  ...authRoutes,
  ...dashboard,
  ...users,
  ...products,
  ...companies,
  ...leads,
  ...messages,
  ...profile,
  ...notifications,
  {
    name: "teste",
    path: "/teste",
    component: Teste,
  },
  {
    path: "/:patchMatch(.*)*",
    component: NotFoundComponent
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  useDefaultStore.commit("TOGGLE_MENU");

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!auth.token()) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
