<template>
  <Card
    class="mb-4 md:mb-0 mensagem cursor-pointer transition hover:shadow-md"
    @click="emit('click')"
  >
    <template #header>
      <div class="flex justify-between items-center w-full">
        <div class="flex items-center space-x-2">
          <div class="h-6 w-6 rounded-full bg-gray-200">
            <img
              :src="message.product.cover"
              loading="lazy"
              class="object-contain h-full w-full rounded-full"
              @error="useFallbackImage"
            />
          </div>
          <div class="flex items-end space-x-2 divide-x divide-gray-200">
            <h3 class="text-default text-sm">
              {{ message.product.name }}
            </h3>
            <div
              v-if="message.events.length"
            >
              <div
                v-tooltip="message.events.map(event => event.name).join('\n')"
                class="flex items-center"
              >
                <EventIcon
                  class="h-5 ml-1"
                  :event-id="message.events[0].id"
                />
                <span class="font-light text-xs text-default pl-2 mt-1 white">{{ message.events[0].name }}</span>
                <span
                  v-if="message.events.length > 1"
                  class="text-xs text-zinc-400 ml-2"
                >
                  + {{ message.events.length - 1 }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center">
          <button
            class="text-xs text-blue-500 text-default px-2 font-light flex items-center"
            @click="onEdit"
          >
            <span class="underline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3 w-3 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </span>
            Editar
          </button>
          <button class="transition hover:bg-gray-200 rounded-md p-1">
            <img
              src="@/assets/icons/copy.svg"
              alt=""
            >
          </button>
        </div>
      </div>
    </template>

    <template #body>
      <p class="text-default font-light text-xs mensagem__description">
        {{ message.message }}
      </p>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { Message } from '@/core/interfaces/Message';
import { computed, PropType } from 'vue';
import useFallbackImage from '@/core/composables/useFallbackImage';
import EventIcon from '../../../components/EventIcon.vue'

const emit = defineEmits(['click', 'edit'])
const props = defineProps({
  message: {
    type: Object as PropType<Message>,
    required:true
  }
})

const onEdit = (event: Event) => {
  event.stopPropagation();
  emit('edit', props.message);
}

</script>

<style scoped>
.mensagem__description {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>