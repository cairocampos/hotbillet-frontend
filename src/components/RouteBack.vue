<template>
<div class="flex items-center">
    <router-link :to="route" class="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#2F2D2C">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <slot />
    </router-link>
    <slot name="extras" />
</div>
</template>

<script>
export default {
    props: ['route']
}
</script>