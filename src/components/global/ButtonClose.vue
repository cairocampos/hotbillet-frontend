<template>
    <button :class="['text-default hover:bg-gray-200 transition', rounded ? 'rounded-full' : '']" @click="$emit('clicked')">
        <svg xmlns="http://www.w3.org/2000/svg" :class="`h-${length} w-${length}`" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
    </button>
</template>

<script>
export default {
    props: {
        length: {
            type:String
        },
        rounded: {
            type:Boolean,
            default:true
        }
    }
}
</script>
