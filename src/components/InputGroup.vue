<template>
  <div class="form-group">
    <label v-if="label" :class="labelClass">{{label}}</label>
    <div class="input-group-custom rounded-sm px-4 py-2" :class="classCustom">
      <div class="input-prepend mr-2">
        <slot name="prepend" />
      </div>
      <slot name="input" />
      <div class="input-append mr-2">
        <slot name="append" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props: {
    label: {
      type: String,
      required:false
    },
    classCustom: {
      type: String,
      required:false
    },
    labelClass: {
      type: String,
      required:false
    }
  },
  setup() {
    //
  }
})
</script>
<style scoped lang="scss">

.input-group-custom {
  display: flex;
  align-items: center;
}

</style>