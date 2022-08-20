<template>
  <div>
    <Player>
      <Youtube
        :video-id="videoId"
        show-fullscreen-control
      />
    </Player>
  </div>
</template>

<script lang="ts" setup>
import { Player, Youtube } from '@vime/vue-next'
import { computed } from 'vue'

const props = defineProps({
  source: {
    type: String,
    required:true
  }
})

const videoId = computed(() => {
  const url = new URL(props.source)
  return url.searchParams.get('v') as string
});


</script>
