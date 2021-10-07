<template>
  <div>
    <div v-if="modelValue && modelValue.show"
        class="fixed top-0 left-0 h-screen w-screen 
        bg-black bg-opacity-50 z-10"
    ></div>

    <transition name="slide-fade" mode="out-in">
        <div v-if="modelValue.show" class="fixed h-screen w-screen top-0 left-0 flex items-center justify-center z-20">
            <div class="modal bg-white rounded-md shadow-sm py-8 px-5 space-y-5" :class="screen">
                <div class="body p-4 flex items-center justify-center flex-col space-y-10">

                    <svg v-if="modelValue.type == 'success'" width="176" height="176" viewBox="0 0 176 176" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M170.968 24.0606C168.379 21.467 164.178 21.4625 161.588 24.0496L82.0127 103.415L53.302 72.2327C50.8212 69.5397 46.6267 69.3651 43.9293 71.8456C41.234 74.3264 41.0614 78.5229 43.5423 81.2183L76.9293 117.477C78.1521 118.806 79.8632 119.578 81.6676 119.616C81.7161 119.618 81.7628 119.618 81.8092 119.618C83.5627 119.618 85.2495 118.921 86.4921 117.683L170.955 33.4418C173.55 30.8551 173.555 26.6542 170.968 24.0606Z" fill="#2F2D2C"/>
                        <path d="M169.367 81.3667C165.703 81.3667 162.734 84.336 162.734 88C162.734 129.21 129.21 162.734 88 162.734C46.7926 162.734 13.2663 129.21 13.2663 88C13.2663 46.7926 46.7926 13.2663 88 13.2663C91.6637 13.2663 94.6333 10.297 94.6333 6.63334C94.6333 2.96931 91.6637 0 88 0C39.4762 0 0 39.4762 0 88C0 136.522 39.4762 176 88 176C136.522 176 176 136.522 176 88C176 84.3363 173.031 81.3667 169.367 81.3667Z" fill="#2F2D2C"/>
                    </svg>

                    <svg v-if="modelValue.type == 'error'" xmlns="http://www.w3.org/2000/svg" class="h-32 w-32 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>

                    <svg v-if="modelValue.type == 'info'" xmlns="http://www.w3.org/2000/svg" class="h-36 w-36 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                    <div class="text-center">
                        <p class="text-default">{{modelValue.text}}</p>
                    </div>
                </div>
            </div>
        </div>
    </transition>
  </div>
</template>

<script lang="ts">

import {defineComponent, watch, computed, onMounted} from 'vue';
import { useStore } from 'vuex';

class AlertaObj {
    constructor (type: string, text: string, show: boolean, duration:number) {
        this.type = type;
        this.text = text;
        this.show = show
        this.duration = duration
    }
    
    type: string;
    // title: string;
    text: string;
    show: boolean;
    duration: number;
}

export default defineComponent({
    props: {
        modelValue: {
            type: Object
        }
    },
   setup(props) {
        const screen = "w-1/4";
        const store = useStore();

        const statusAlert = computed(() => props.modelValue ? props.modelValue?.show : null);

        watch(statusAlert, (val) => {
            let temporizador;
            if(val) {
                temporizador =  setTimeout(() => {
                    store.commit('alerta/UPDATE_ALERTA', {show:false});
                }, props.modelValue?.duration ? props.modelValue?.duration : 3000);
            } else {
                clearTimeout(temporizador);
            }
        })

        return {
            screen
        }
   }
});
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all .3s ease-out;
}

.slide-fade-leave-active {
  transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-50px);
  opacity: 0;
}
</style>