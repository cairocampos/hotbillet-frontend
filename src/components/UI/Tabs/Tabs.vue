<script lang="ts">
import {computed, defineComponent, h, Transition, TransitionGroup} from 'vue';

export default defineComponent({
  props: {
    modelValue: {
      type: Number,
      required:true
    },
    secondary: {
      type: Boolean,
      default:() => {
        return false
      }
    }
  },
  emits: ['update:modelValue'],
  setup(props, {slots, emit}) {

    const tabActiveStyle = computed(() => {
      const border = props.secondary ? 'border-gray-500' : 'border-yellow-500'
      return `border-b-2 ${border} text-gray-700 font-medium`;
    });

    const render = () => {
      // @ts-ignore
      const items = slots?.default().map((item, key) => {
        const isActive = props.modelValue == key
        return h('li',
          {
            class: [
              'text-default pb-4 px-4 cursor-pointer text-sm"',
              {active: isActive},
              isActive ? tabActiveStyle.value : ''
            ],
            key,
            onClick: () => {
              // @ts-ignore
              return emit('update:modelValue', key)
            }},
          // @ts-ignore
          item.props?.title ?? item.children.title())
      });
      const list = h('ul',
        {
          class: "flex space-x-4 w-full"
        },
        items,
      )

        // @ts-ignore
      const tabContent = slots?.default()?.map((item, key) => {
        const lazy = typeof item.props?.lazy === 'string';
        const isActive = props.modelValue == key;
          // @ts-ignore
        const child = item.children?.default();
        // @ts-ignore
        return h('div', {
            class: ['tab__content', {active: isActive}]
          },
          lazy ? (isActive ? child : "") : child)
      })

      const divContent = h('div', {
        class: ['flex justify-between items-center border-b']
      });

      const elements = [];
      if(slots.actions && slots.actions()) {
        elements.push([
        // @ts-ignore
        h(divContent, [list, h('div', {class: ['flex items-center']}, slots.actions())]),
        ...tabContent
        ])
      } else {
        elements.push([
        // @ts-ignore
        h(divContent, [list, h('div')]),
        ...tabContent
        ])
      }

      return h('div', elements);

    }

    return () => render();
  }
})
</script>

<style lang="scss">
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.slide-leave-to {
  transform: translateX(20px);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}

.tab {
  &__content {
    transition: all .3s;
    display:none;
    margin-top: 16px;
    animation: teste .5s;
    &.active {
      display:flex;
    }
  }
}

@keyframes teste {
  from {
    opacity: 0;
    transform: translateX(-15px)
  }
}
</style>