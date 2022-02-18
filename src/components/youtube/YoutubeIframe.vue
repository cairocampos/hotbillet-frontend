<template>
  <iframe
    width="560"
    height="315"
    :src="source"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    source: {
      type: String,
      required:true
    }
  },
  setup() {
    //
  },
})
</script>
