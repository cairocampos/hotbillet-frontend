<template>
  <div>
    <div
      v-if="searchable"
      class="flex justify-end mb-8"
    >
      <TextField
        v-model="search"
        placeholder="Buscar..."
        size="sm"
        variant="secondary"
      >
        <template #left>
          <PhMagnifyingGlass/>
        </template>
      </TextField>
    </div>
    <table
      v-if="items.length"
      class="table table-white w-full text-sm mb-10"
    >
      <thead>
        <th
          v-for="(header, index) in headers"
          :key="index"
          :align="header.align ?? 'left'"
          :colspan="header.colspan"
        >
          <span v-show="header.show !== false">{{ header.text }}</span>
        </th>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in items"
          :key="index"
        >
          <td
            v-for="(header, i) in headers"
            :key="i"
            :align="header.align ?? 'left'"
            :colspan="header.colspan"
            :class="[header.align == 'right' ? 'flex justify-end' : '']"
          >
            <slot
              v-if="$slots[header.value]"
              :name="header.value"
              :item="item"
            />
            <span v-else>
              {{ resolve(header, item) }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <NoRecords v-else />
  </div>
</template>

<script lang="ts">
import { IHeader } from "@/interfaces/IDatatable";
import { defineComponent, PropType, ref, watch } from "vue";
import TextField from "../Form/Input/TextField.vue";
import NoRecords from "@/components/NoRecords.vue";
import {PhMagnifyingGlass} from 'phosphor-vue'

type Item = {
  [key: string]: string;
};

export default defineComponent({
  components: { TextField, NoRecords,PhMagnifyingGlass },
  props: {
    headers: {
      type: Array as PropType<IHeader[]>,
      required: true,
    },
    items: {
      type: Array as PropType<Item[]>,
      required: true,
    },
    searchable: {
      type: Boolean,
      default: false
    }
  },
  emits: ['search'],
  setup(props, {emit}) {
    const search  = ref("");
    let interval = setTimeout(() => null)
    watch(search, val => {
      if(val.length > 3) {
        clearTimeout(interval);
        interval = setTimeout(() => {
          emit('search', val)
        })
      }
    })


    const resolveNestedObject = (header: IHeader, item: Item) => {
      const split = header.value.split(".");
      let value = item as
        | {
            [key: string]: string | number;
          }
        | number
        | string;
      split.forEach((property) => {
        if (value && typeof value == "object") {
          value = value[property];
        } else {
          return;
        }
      });
      return value;
    };
    const resolve = (header: IHeader, item: Item) => {
      if (header?.format) {
        return header.format(item[header.value]);
      }
      if (/\./g.test(header.value)) {
        return resolveNestedObject(header, item);
      }
      return item[header.value];
    };
    return {
      search,
      resolve,
    };
  }
});
</script>

<style lang="scss" scoped></style>
