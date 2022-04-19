<template>
  <div
    ref="element"
    class="relative inline-block text-left"
  >
    <div
      class="bg-white py-2 px-4 rounded-l-md cursor-pointer"
      @click="isOpen = !isOpen"
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
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </svg>
    </div>
    <Transition
      name="top-down"
      mode="out-in"
    >
      <div
        v-show="isOpen"
        class="hot__notifications-content origin-top-right absolute right-0 mt-2 rounded-md shadow-md border"
      >
        <div class="py-1 rounded-md bg-white shadow-xs">
          <div class="flex items-center justify-between p-4 border-b">
            <Heading
              class="font-normal"
              size="sm"
            >
              Notificações
            </Heading>
            <Badge
              variant="success"
              opacity="50"
            >
              6 new
            </Badge>
          </div>
          <div class="h-80 overflow-hidden overflow-y-auto">
            <ItemNotification
              v-for="i in 15"
              :key="i"
            />
          </div>
          <div class="p-4">
            <ButtonRouter
              :blocked="true"
              variant="info"
              to="/notificacoes"
            >
              Visualizar todas notificações
            </ButtonRouter>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, provide, ref } from "vue";
import ItemNotification from "./ItemNotification.vue";
import Heading from "../UI/Layout/Heading.vue";
import Badge from "../UI/Badge/Badge.vue";
import ButtonRouter from "../UI/Button/ButtonRouter.vue";
export default defineComponent({
  components: { ItemNotification, Heading, Badge, ButtonRouter },
  props: {
    label: {
      type: String,
      default: "Dropdown",
    },
  },
  setup() {
    const element = ref<HTMLElement>();
    const isOpen = ref(false);
    const toggle = () => (isOpen.value = !isOpen.value);
    const close = () => (isOpen.value = false);
    provide("closeDropdown", close);
    const clickOutsideElement = (event: Event) => {
      // @ts-ignore
      if (!element.value?.contains(event.target)) {
        close();
      }
    };
    onMounted(() => {
      document.addEventListener("click", clickOutsideElement);
    });
    onBeforeUnmount(() => {
      document.removeEventListener("click", clickOutsideElement);
    });
    return {
      element,
      isOpen,
      toggle,
    };
  },
});
</script>

<style lang="scss" scoped>
.hot__notifications-content {
  width: 30rem;
}

.top-down-enter-from,
.topdown-leave-to {
  transform: translate3d(0,50px,0);
  opacity: 0;
}
.top-down-enter-active,
.topdown-leave-active {
  transition: all .3s;
}


</style>
