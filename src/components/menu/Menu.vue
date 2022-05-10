<template>
  <aside :class="['menu hidden lg:flex flex-col flex-shrink-0']">
    <MenuLogo />
    <MenuAccount />
    <MenuItem
      v-for="(route, index) in routes"
      :key="index"
      :route="route"
      class="my-2 py-4"
    />
  </aside>
</template>

<script lang="ts">
import MenuItem from './MenuItem.vue'
import MenuLogo from './MenuLogo.vue';
import MenuAccount from './MenuAccount.vue';
import router from '../../router';
import { computed } from 'vue';
export default {
  components: {
    MenuItem,
    MenuLogo,
    MenuAccount
  },
  setup() {
    const mobile = computed(() => {
      const menuAtivo = false;

      if(menuAtivo)
        return 'menu-ativo';

      return '';
    })
    const routes = computed(() => {
      return router.getRoutes().filter(route => route.meta.showOnMenu)
    });

    return {
      mobile,
      routes
    }
  }
}
</script>

<style lang="scss" scoped>
.menu {
  width: 225px;
  background-color: #2F2D2C;
  min-height: 100vh;
}

.text__username {
  max-width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.menu-ativo {}


@media (max-width:600px) {
  .menu-ativo {
    display:flex;
    position:fixed;
    top:0;
    left:0;
    width:100%;
    z-index:10;
    transition:all .3s ease-in;
    overflow: hidden;
    overflow-x: scroll;
  }
}


</style>