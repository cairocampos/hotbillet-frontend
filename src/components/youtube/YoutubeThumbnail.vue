<template>
  <div class="w-full bg-red-500">
    <img
      :src="urlThumb"
      class="w-full object-cover"
    />
  </div>
  <a
    :href="source"
    class="text-link"
  >{{ source }}</a>
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
