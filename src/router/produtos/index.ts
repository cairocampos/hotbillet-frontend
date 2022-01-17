import { RouteRecordRaw } from "vue-router";
import Produtos from "@/views/produtos/Produtos.vue";
import Produto from "@/views/produtos/Produto.vue";
import AdicionarProduto from "@/views/produtos/AdicionarProduto.vue";
import EditarProduto from "@/views/produtos/EditarProduto.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/produtos",
    name: "Produtos",
    component: Produtos,
    meta: { requiresAuth: true },
  },
  {
    path: "/produtos/:id",
    name: "Produto",
    component: Produto,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/produtos/adicionar",
    name: "AdicionarProduto",
    component: AdicionarProduto,
    meta: { requiresAuth: true },
  },
  {
    path: "/produtos/:id/editar",
    props: true,
    name: "EditarProduto",
    component: EditarProduto,
    meta: { requiresAuth: true },
  },
];

export default routes;
