<template>
  <span :class="badgeStyle">
      {{text}}
  </span>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    props: {
        text: String,
        color: String
    },
    computed: {
        badgeStyle() {
            return `badge badge__${this.color}`;
        }
    }
})
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables';
.badge {
    padding: 2px 8px;
    font-size: 10px;
    border-radius: 10px;
    &__blue {
        background-color: $blue;
        color:white;
    }
    &__purple {
        background-color: $purple;
        color:white;
    }
    &__green {
        background-color: $green;
        color:white;
    }
    &__yellow {
        background-color: $yellow;
    }
    &__red {
        background-color: $red;
        color:white;
    }
}

</style>