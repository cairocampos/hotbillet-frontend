<template>
  <div :class="['flex items-center', {'border-b': !secondary}]">
    <ul class="flex items-center justify-around w-full">
      <li 
        v-for="tab in tabs"
        :key="tab.label"
        :class="['text-default pb-4 px-4 cursor-pointer', secondary ? 'text-xs' : 'text-sm', tab.label == tabActive.label ? tabActiveStyle : '']"
        @click="handleTab(tab)"
      >
        {{ tab.label }}
      </li>
    </ul>
    <div>
      <slot name="acessorios" />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import { ITab } from '@/interfaces/ITab';

export default defineComponent({
    props: {
        tabs: {
            type: Array as PropType<ITab[]>
        },
        tabActive: {
            type: Object as PropType<ITab>
        },
        secondary: {
            type: Boolean,
            default:() => {
                return false
            }
        }
    },
    data() {
        return {
            propTabs: this.tabs
        }
    },
    computed: {
        tabActiveStyle() {
            const border = this.secondary ? 'border-gray-500' : 'border-yellow-500'
            return `border-b-2 ${border} text-gray-700 font-medium`;
        }
    },
    methods: {
        handleTab(tab: ITab){
            this.$emit('update:tabActive', tab);
        }
    }
})
</script>