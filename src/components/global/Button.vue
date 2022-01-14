<template>
    <button :disabled="disabled">
        <div class="flex items-center space-x-2" v-if="loading">
            <Loading v-if="loading" />
            <span class="text-white">Carregando...</span>
        </div>
        <span v-else class="text-white">
            {{title}}
        </span>
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        title: {
            type: String
        },
        loading: {
            type: Boolean,
            default:false
        },
        disabled: {
            type: Boolean,
            default:false
        }
    }
})
</script>

<style lang="scss" scoped>
button {
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
}
</style>
