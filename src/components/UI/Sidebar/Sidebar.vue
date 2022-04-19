<template>
  <div
    v-if="show"
    class="h-screen w-screen bg-black bg-opacity-30 fixed left-0 top-0 z-50"
    @click="toggle()"
  />
  <transition name="slide">
    <div
      v-if="show"
      class="sidebar-custom shadow-sm p-4"
    >
      <div class="sidebar-custom-header">
        <div class="w-fulf mb-8">
          <button
            class="text-default text-sm space-x-2"
            @click="toggle()"
          >
            <Icon icon="arrow-left" />
            <span>Fechar</span>
          </button>
        </div>
      </div>
      <div class="sidebar-custom-body">
        <slot name="body" />
      </div>
    </div>
  </transition>
</template>

<script lang="ts">import { defineComponent,ref, watch } from "vue";

export default defineComponent({
    props: {
        show: Boolean
    },
    emits: ["close"],
    setup(props, { emit }) {
        const isActive = ref(false);
        watch(isActive, val => {
            if (!val)
                emit("close");
        });
        const toggle = () => {
            emit("close");
            // isActive.value = !isActive.value;
        };
        return {
            isActive,
            toggle
        };
    }
})
</script>

<style lang="scss" scoped>
.sidebar-custom {
  width: 464px;
  // transform: translateX(250px);
  height: 100%;
  position: fixed;
  top:0;
  right:0;
  background-color: #FFF;
  z-index: 5600;
  transition: all .3s ease-in-out;
  &.active {
    width: 364px;
    transform: translateX(0);
  }
}

.slide-enter-from {
  transform: translateX(250px) 
}

.slide-leave-to {
  width:0;
  padding:0;
  transform: translateX(250px)
}

.slide-enter-active,
.slide-leave-active {
  transition: all .3s;
}


</style>