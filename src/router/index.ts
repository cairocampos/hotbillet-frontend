import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import {auth} from '@/services'
import Login from '@/views/Auth/Login.vue';
import Dashboard from '@/views/Dashboard.vue';
import Leads from '@/views/leads/Leads.vue';
import Agenda from '@/views/agenda/Agenda.vue';
import Usuarios from '@/views/usuarios/Usuarios.vue';
import AdicionarUsuario from '@/views/usuarios/AdicionarUsuario.vue';

// Produtos
import Produtos from '@/views/produtos/Produtos.vue';
import AdicionarProduto from '@/views/produtos/AdicionarProduto.vue';

import Mensagens from '@/views/mensagens/Mensagens.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    components: {
      login: Login
    }
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: {requiresAuth:true}
  },
  {
    path: '/leads',
    name: 'Leads',
    component: Leads,
    meta: {requiresAuth:true}
  },
  {
    path: '/agenda',
    name: 'Agenda',
    component: Agenda,
    meta: {requiresAuth:true}
  },
  {
    path: '/produtos',
    name: 'Produtos',
    component: Produtos,
    meta: {requiresAuth:true}
  },
  {
    path: '/produtos/adicionar',
    name: 'AdicionarProduto',
    component: AdicionarProduto,
    meta: {requiresAuth:true}
  },
  {
    path: '/mensagens',
    name: 'Mensagens',
    component: Mensagens,
    meta: {requiresAuth:true}
  },
  {
    path: '/usuarios',
    name: 'Usuarios',
    component: Usuarios,
    meta: {requiresAuth:true}
  },

  {
    path: '/usuarios/adicionar',
    name: 'AdicionarUsuario',
    component: AdicionarUsuario,
    meta: {requiresAuth:true}
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach((to, from, next) => {
//   if(to.matched.some(record => record.meta.requiresAuth)) {
//     if(!auth.loggedIn()) {
//       next({
//         path: '/login',
//         query: {redirect:to.fullPath}
//       })
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
// });

export default router
