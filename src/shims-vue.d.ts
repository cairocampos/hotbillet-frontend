/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue/types/vue' {
  interface Vue {
    $router: Router,
    $route: Router,
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store;
  }
}
