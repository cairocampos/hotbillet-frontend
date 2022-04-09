<template>
  <span :class="badgeStyle">
    {{ text }}
  </span>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props: {
    text: {
      type: String,
      required: false,
      default: "",
    },
    color: {
      type: String,
      required: false,
      default: "",
    },
  },
  computed: {
    badgeStyle() {
      return `badge badge__${this.color}`;
    },
  },
});
</script>

<style scoped lang="scss">
@import "@/assets/scss/_variables";
.badge {
  padding: 2px 8px;
  font-size: 10px;
  border-radius: 10px;
  &__blue {
    background-color: $info;
    color: white;
  }
  &__purple {
    background-color: $purple;
    color: white;
  }
  &__green {
    background-color: $success;
    color: white;
  }
  &__yellow {
    background-color: $yellow;
  }
  &__red {
    background-color: $danger;
    color: white;
  }
}
</style>