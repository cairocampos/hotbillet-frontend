<template>
  <component
    :is="htmlComponent"
    v-bind="attrComponent"
    :class="baseClass"
    :disabled="disabled || loading"
    :type="type"
    @click="onClick"
  >
    <slot name="left"></slot>
    <Spinner
      v-if="loading"
      class="w-4 h-4"
    />
    
    <span v-if="textLoading && loading">{{ textLoading }}</span>
    <slot v-else></slot>
    <slot name="right"></slot>
  </component>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue';
import Spinner from '../Spinner/Spinner.vue';
type ButtonSize = "xs"|"sm"|"md"|"lg"
type ButtonVariants = "primary"|"secondary"|"info"|"danger"|"dark"|"warning"|"brand"
|"success"|"light"|"special"|"reset"|"link"

const props = defineProps({
  variant: {
    type: String as PropType<ButtonVariants>,
    default: "reset"
  },
  size: {
    type: String as PropType<ButtonSize>,
    default: "md"
  },
  outline: {
    type: Boolean,
    default:false
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default:false
  },
  radius: {
    type: String,
    default: "full"
  },
  redirect: {
    type: [String,Object],
    default: ""
  },
  textLoading: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    default: 'button'
  }
})

const emit = defineEmits([
  'click'
])

const baseClass = computed(() => {
  return [
    'btn',
    `btn-${props.size}`,
    `btn-${props.outline ? `outline-${props.variant}` : props.variant}`,
    props.radius ? `rounded-${props.radius}` : null,
    props.block ? 'w-full' : null
  ]
});

const htmlComponent = computed(() => {
  if(props.redirect && props.redirect) {
    if(typeof props.redirect == "string" && /http/.test(props.redirect)) {
      return "a";
    }

    return "router-link"
  }

  return 'button';
});

const attrComponent = computed(() => {
  const attrs = {
    a: {
      href: props.redirect,
      target: "_blank"
    },
    button: {
      type: "button"
    },
    "router-link": {
      to: props.redirect
    }
  }

  return attrs[htmlComponent.value]
});

const onClick = () => emit('click')

</script>

<style scoped>
.btn {
  @apply flex justify-center text-zinc-800 align-middle border border-transparent
  py-2 px-3 transition-all items-center gap-2 disabled:cursor-not-allowed;
}
.btn-primary { @apply bg-primary-500 text-white hover:bg-primary-400 disabled:opacity-75 disabled:hover:bg-primary-400; }
.btn-outline-primary {@apply border border-primary-500 hover:bg-primary-500 text-primary-500 hover:text-white; }
.btn-secondary { @apply bg-dark-500 text-white hover:bg-dark-400 disabled:opacity-75 disabled:hover:bg-dark-400; }
.btn-outline-secondary { @apply border border-dark-500 hover:bg-dark-500 text-dark-500 hover:text-base; }
.btn-success { @apply bg-success-500 text-white hover:bg-success-400 disabled:opacity-75 disabled:hover:bg-success-400;; }
.btn-outline-success {@apply border border-success-500 hover:bg-success-500 text-success-500 hover:text-white;}
.btn-danger { @apply bg-danger-500 text-white hover:bg-danger-400 disabled:opacity-75 disabled:hover:bg-danger-400;; }
.btn-outline-danger {	@apply border border-danger-500 hover:bg-danger-500 text-danger-500 hover:text-white; }
.btn-warning { @apply bg-warning-500 text-white hover:bg-warning-400 disabled:opacity-75 disabled:hover:bg-warning-400;; }
.btn-info { @apply bg-teal-500 text-white hover:bg-teal-400 disabled:opacity-75 disabled:hover:bg-teal-400;; }
.btn-outline-info { @apply border border-teal-500 hover:bg-teal-500 hover:text-teal-500; }
.btn-light { @apply bg-light-200 text-zinc-900 hover:bg-light-200; }
.btn-dark { 
  background: linear-gradient(180deg, #494545 -46.02%, #2F2D2C 100%);
  @apply text-white hover:opacity-95 disabled:opacity-30 disabled:hover:bg-dark-500;
}


.btn-outline-dark { @apply border border-dark-500 hover:bg-dark-500 hover:text-white; }
.btn-outline-dark:hover {
  background: linear-gradient(180deg, #494545 -46.02%, #2F2D2C 100%);
}

/*SIZES */
.btn-xs {@apply text-xs};
.btn-sm { @apply px-6 py-2 text-xs }
.btn-md { @apply text-sm px-6 py-2 }
.btn-lg { @apply px-4 py-2 text-lg }

.btn-reset { @apply bg-transparent hover:shadow-none text-zinc-700; }

.btn-link {@apply p-0 text-blue-500;}
.btn-special {
	@apply text-white;
  border-color: #FF7800;
	background: linear-gradient(180deg, #FF7800 -65.37%, #E31E22 100%);
}

.btn-special:hover{
	@apply text-white;
	background: linear-gradient(180deg, #FF7800 -30.37%, #E31E22 100%)
}
</style>