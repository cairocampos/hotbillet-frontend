import Integrations from '../views/Integrations.vue'
import { RouteRecordRaw } from 'vue-router'
import IntegrationsIcon from "@/assets/icons/menu/integrations.svg"

const integrationsRoutes: RouteRecordRaw[] = [
  {
    path: "/integracoes",
    name: "Integrations",
    component: Integrations,
    meta: {
      showOnMenu: true,
      label: "Integrações",
      icon: IntegrationsIcon,
      requiresAuth:true
    }
  }
]

export {
  integrationsRoutes
}