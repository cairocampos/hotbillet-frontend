import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { auth } from "@/services";
import { useDefaultStore } from "@/store";

//rotas
import authRoutes from "./auth";
import dashboard from "./dashboard";
import usuarios from "./usuarios";
import produtos from "./produtos";
import leads from "./leads";
import agenda from "./agenda";
import mensagens from "./mensagens";
import perfil from "./perfil";
import empresas from "./empresas";

const routes: Array<RouteRecordRaw> = [
  ...authRoutes,
  ...dashboard,
  ...usuarios,
  ...produtos,
  ...leads,
  ...agenda,
  ...mensagens,
  ...perfil,
  ...empresas,
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
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
