<template>
<ul class="mt-8 space-y-3">
    <li>
        <router-link to="/" :class="['flex text-gray-200 px-6 py-3', {active: rotaAtiva == 'Dashboard'}]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
            Dashboard
        </router-link>
    </li>

    <li>
        <router-link :to="{name: 'Leads'}" :class="['flex text-gray-200 px-6 py-3', {active: routeGroup('lead')}]">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
        </svg>
        Leads
        </router-link>
    </li>

    <li>
        <router-link :to="{name: 'Agenda'}" :class="['flex text-gray-200 px-6 py-3', {active: routeGroup('agenda')}]">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Agenda
        </router-link>
    </li>

    <li>
        <router-link :to="{name: 'Produtos'}" :class="['flex text-gray-200 px-6 py-3', {active: routeGroup('produto')}]">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
        Produtos
        </router-link>
    </li>

    <li>
        <router-link :to="{name: 'Mensagens'}" :class="['flex text-gray-200 px-6 py-3', {active: routeGroup('mensagens')}]">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
        Mensagens
        </router-link>
    </li>

    <li>
        <router-link :to="{name: 'Usuarios'}" :class="['flex text-gray-200 px-6 py-3', {active: rotaAtiva == 'Usuarios'}]">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        Usuários
        </router-link>
    </li>
</ul>
</template>

<script lang="ts">
import { computed, defineComponent } from "@vue/runtime-core";
import { useRoute } from "vue-router";

export default defineComponent({
    setup() {
        const route = useRoute();
        const rotaAtiva = computed(() => {
            return route.name
        });
        
        const routeGroup = (name:string) => {
            const regex = new RegExp(name, "gi")
            return regex.test(route.name as string);
        }
        
        return {
            rotaAtiva,
            routeGroup
        }
    }

})
</script>

<style lang="scss" scoped>
ul li a {
    transition: all .3s;
    position: relative;
    font-size: 14px;
    &.active {
      background-color:rgba(73, 69, 69, 0.5);
      &::before {
        content:"";
        display: block;
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        width: 10px;
        background: linear-gradient(220.25deg, #E31E22 -4.91%, #FF7800 111.79%);
      }
    }
}
</style>