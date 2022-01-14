<template>
    <div class="flex items-center justify-between border-b">
        <ul class="flex items-center space-x-8">
            <li 
            v-for="tab in tabs"
            :class="['text-default pb-4 px-4 cursor-pointer text-sm', tab.label == tabActive.label ? 'border-b-2 border-yellow-600 text-gray-700 font-semibold' : '']"
            @click="handleTab(tab)"
            :key="tab.label">{{tab.label}}</li>
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
        }
    },
    data() {
        return {
            propTabs: this.tabs
        }
    },
    methods: {
        handleTab(tab: ITab){
            this.$emit('update:tabActive', tab);
        }
    }
})
</script>
