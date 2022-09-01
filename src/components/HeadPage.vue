<template>
  <header class="flex justify-between items-center my-10 relative">
    <slot>
      <h1 class="text-2xl text-gray-600">
        {{ title }}
      </h1>
    </slot>
    <!-- <div class="md:hidden" @click="toggleMenu">
      <button class="p-2 bg-gray-200 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div> -->
    <div class="hidden md:flex divide-x divide-gray-200 text-gray-600 icons">
      <DropdownNotifications />
      <div
        class="bg-white py-2 pl-4 pr-8 cursor-pointer"
        @click="onLogout"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { useAuthStore } from "@/core/store/modules/auth";
import { defineComponent } from "@vue/runtime-core";
import DropdownNotifications from "./DropdownNotifications/DropdownNotifications.vue";

export default defineComponent({
    components: { DropdownNotifications },
    props: {
      title: {
        type: String,
        default: ""
      }
    },
    setup() {
        const store = useAuthStore()

        const onLogout = () => {
          store.logout();
        }

        const toggleMenu = () => {
            // store.commit("TOGGLE_MENU");
        };
        return {
            // store,
            toggleMenu,
            onLogout
        };
    }
})
</script>

<style scoped>
.icons {
  position: absolute;
  right: -30px;
  top: 0;
}
</style>