import { RouteRecordRaw } from 'vue-router'
import Integrations from '../views/Integrations.vue'
import CreateIntegration from '../views/CreateIntegration.vue'
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
  },
  {
    path: "/integracoes/adicionar",
    name: "CreateIntegration",
    component: CreateIntegration,
    meta: {
      showOnMenu: false,
      requiresAuth:true
    }
  }
]

export {
  integrationsRoutes
}