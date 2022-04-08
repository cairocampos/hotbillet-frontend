import { RouteRecordRaw } from "vue-router";
import Products from "../views/Products.vue";
import Product from "../views/Product.vue";
import CreateProduct from "../views/CreateProduct.vue";
import UpdateProduct from "../views/UpdateProduct.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/produtos",
    name: "Products",
    component: Products,
    meta: {
      requiresAuth: true,
      label: "Produtos",
      showOnMenu: true,
      icon: "box"
    },
  },
  {
    path: "/produtos/:id",
    name: "Product",
    component: Product,
    props: true,
    meta: {
      requiresAuth: true,
      showOnMenu:false
    },
  },
  {
    path: "/produtos/adicionar",
    name: "CreateProduct",
    component: CreateProduct,
    meta: {
      requiresAuth: true,
      showOnMenu:false
    },
  },
  {
    path: "/produtos/:id/editar",
    props: true,
    name: "UpdateProduct",
    component: UpdateProduct,
    meta: {
      requiresAuth: true,
      showOnMenu:false
    },
  },
];

export default routes;
