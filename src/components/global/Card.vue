<template>
  <div class="p-4 bg-white shadow-sm rounded-md">
    <div class="flex items-center justify-between">
      <slot name="header" />
    </div>
    <div class="mt-4">
      <slot name="body" />
    </div>
  </div>
</template>
