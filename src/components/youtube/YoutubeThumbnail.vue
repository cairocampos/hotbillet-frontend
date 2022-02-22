<template>
  <a
    class="w-full bg-red-500"
    :href="source"
    target="_blank"
  >
    <div>
      <img
        :src="urlThumb"
        class="w-full object-cover"
      />
    </div>
    <p
      class="text-link mt-2"
    >
      {{ source }}
    </p>
  </a>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  props: {
    source: {
      type: String,
      required:true
    }
  },
  setup(props) {
    const YOUTUBE_THUMB_URL = 'https://img.youtube.com/vi/REPLACER/default.jpg';
    
    const urlThumb = computed(() => {
      if(!props.source.includes('youtube') || !props.source.includes('http'))
        return YOUTUBE_THUMB_URL;

      const url = new URL(props.source);

      const param = url.searchParams.get('v') ?? '';

      return YOUTUBE_THUMB_URL.replace('REPLACER', param);
    })

    return {
      urlThumb
    }

  },
})
</script>
