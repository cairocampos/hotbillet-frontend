import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import {auth} from '@/services'
import Login from '@/views/Auth/Login.vue';
import Dashboard from '@/views/Dashboard.vue';

import Leads from '@/views/leads/Leads.vue';
import Lead from '@/views/leads/Lead.vue';

import Agenda from '@/views/agenda/Agenda.vue';
import Usuarios from '@/views/usuarios/Usuarios.vue';
import AdicionarUsuario from '@/views/usuarios/AdicionarUsuario.vue';

// Produtos
import Produtos from '@/views/produtos/Produtos.vue';
import Produto from '@/views/produtos/Produto.vue';
import AdicionarProduto from '@/views/produtos/AdicionarProduto.vue';
import EditarProduto from '@/views/produtos/EditarProduto.vue';

import Mensagens from '@/views/mensagens/Mensagens.vue';
import Perfil from '@/views/perfil/Perfil.vue';

import {useDefaultStore} from '@/store';

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
    path: '/leads/:id',
    name: 'Lead',
    component: Lead,
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
    path: '/produtos/:id',
    name: 'Produto',
    component: Produto,
    meta: {requiresAuth:true}
  },
  {
    path: '/produtos/adicionar',
    name: 'AdicionarProduto',
    component: AdicionarProduto,
    meta: {requiresAuth:true}
  },
  {
    path: '/produtos/:id/editar',
    name: 'EditarProduto',
    component: EditarProduto,
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
  },

  {
    path:'/perfil',
    name:'Perfil',
    component: Perfil,
    meta: {requiresAuth:true}
  }


];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {

  useDefaultStore.commit('TOGGLE_MENU');

  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(!auth.token()) {
      next({
        path: '/login',
        query: {redirect:to.fullPath}
      })
    } else {
      next()
    }
  } else {
    next()
  }
});

export default router
