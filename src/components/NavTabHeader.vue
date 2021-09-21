<template>
    <div class="flex items-center justify-between border-b">
        <ul class="flex items-center space-x-8">
            <li 
            v-for="tab in tabs"
            :class="['text-default pb-4 cursor-pointer', tab.value == tabAtivo ? 'border-b-2 border-yellow-500 text-gray-800' : '']"
            @click="handleTab(tab)"
            :key="tab.value">{{tab.label}}</li>
        </ul>
        <div>
            <slot name="acessorios" />
        </div>
    </div>
</template>

<script setup lang="ts">
import {defineProps, toRefs, ref, watch, defineEmits} from 'vue';

interface Tab {
    label:string;
    value:any;
}

const props = defineProps({
    tabs: Array as Tab
});

const emit = defineEmits(['change-tab']);

const {tabs} = toRefs(props);

const tabAtivo = ref(tabs.value[0].value);

const handleTab = (tab: {label:string;value:any}) => {
    tabAtivo.value = tab.value;
}

watch(tabAtivo, (value) => {
    emit('change-tab', value);
})

</script>
