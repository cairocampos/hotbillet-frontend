<template>
  <ul class="py-10 text-right" v-if="paginasTotal > 1">
    <li class="out">
        <router-link
        class="font-bold"
        :to="{ query: paginaAnterior() }"
      >Anterior</router-link>
    </li>
    <li v-for="pagina in paginas" :key="pagina">
      <router-link
        :to="{ query: query(pagina) }"
        :class="[paginaAtual == pagina ? 'active': '']"
      >{{ pagina }}</router-link>
    </li>

    <li class="out">
        <router-link
        class="font-bold"
        :to="{ query: proximaPagina() }"
      >Próximo</router-link>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { defineProps,computed, toRefs } from "vue"
import { useRoute } from "vue-router";


const props = defineProps({
    porPagina: {
        type: Number,
        default: 1
    },
    total: {
        type: Number,
        required:true
    }
});

const {total, porPagina} = toRefs(props);
const route = useRoute();
const query = (pagina:string) => {
    return {
        ...route.query,
        pagina
    }
}

const paginaInicial = 1;

const paginas = computed(() => {
    const current = route.query.pagina || 1;
    const range = 9;
    let offset = Math.ceil(range / 2);
    let pagesArray = [];
    for (let i = 1; i <= total.value; i++) {
        pagesArray.push(i);
    }
    // @ts-ignore
    pagesArray.splice(0, current - offset);
    pagesArray.splice(range, total.value);
    return pagesArray;
});

const paginasTotal = computed(() => {
    return total.value !== Infinity ? Math.ceil((total.value / porPagina.value)) : paginaInicial;
});

const paginaAtual = computed(() => {
    if (route.query.pagina) {
        // @ts-ignore
        return parseInt(route.query.pagina);
    } else {
        return paginaInicial;
    }
});

const proximaPagina = () => {
    if(paginaAtual.value < paginas.value.length) {
        return {
            ...route.query,
            pagina: paginaAtual.value + 1
        }
    }
}

const paginaAnterior = () => {
    if(paginaAtual.value > paginas.value[0]) {
        return {
            ...route.query,
            pagina: paginaAtual.value  - 1
        }
    }
}

</script>

<style scoped>
ul {
  grid-column: 1 / -1;
}
li {
  display: inline-block;
}
li a {
  padding: 2px 8px;
  border-radius: 2px;
  margin: 4px;
  color: #757575;
  transition: all .1s ease-in;
}

li:not(.out) a:hover,
li:not(.out) a.active {
    font-weight:bold;
    color: white;
    background-color: #757575;
}
</style>