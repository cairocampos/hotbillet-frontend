<template>
  <!-- <li> -->
  <router-link
    :to="route.path"
    :class="['flex text-gray-200 px-6 py-2 items-center space-x-2 space-y-0', {active: activeRoute == route.name}]"
  >
    <Icon
      :icon="route.meta.icon"
      class="text-lg"
    />
    <Text>{{ route.meta.label }}</Text>
  </router-link>
  <!-- </li> -->
</template>

<script lang="ts">
import { computed, defineComponent } from "@vue/runtime-core";
import { RouteRecordNormalized, useRoute } from "vue-router";
import {PropType} from 'vue'
import Text from "../UI/Text.vue";

export default defineComponent({
  components: { Text },
    props: {
        route: {
            type: Object as PropType<RouteRecordNormalized>,
            required: true
        }
    },
    setup() {
        const route = useRoute();
        const activeRoute = computed(() => {
            return route.name;
        });
        const routeGroup = (name: string) => {
            const regex = new RegExp(name, "gi");
            return regex.test(route.name as string);
        };
        return {
            activeRoute,
            routeGroup
        };
    },
})
</script>

<style lang="scss" scoped>
a {
  transition: all .3s;
  position: relative;
  font-size: 14px;
  &.active {
    background-color:rgba(73, 69, 69, 0.5);
    &::before {
      content:"";
      display: block;
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      width: 10px;
      background: linear-gradient(220.25deg, #E31E22 -4.91%, #FF7800 111.79%);
    }
  }
}
</style>