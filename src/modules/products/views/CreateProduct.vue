<template>
  <div>
    <HeadPage
      class="mb-10"
      title="Novo Produto"
    />

    <div class="flex items-start justify-between">
      <ul class="steps hidden md:flex space-x-16 relative">
        <li
          v-for="step in steps"
          :key="step.label"
          class="text-sm text-default md:flex flex-col items-center space-y-4"
        >
          <div
            :class="[
              'steps__circle rounded-full w-8 h-8 border-2 flex items-center justify-center text-xs bg-gray-100 z-10',
              step.ordem === 1 ? 'border-gray-800' : '',
            ]"
          >
            <span :class="[step.ordem === 1 ? 'text-black font-medium' : '']">{{ step.ordem }}º</span>
          </div>
          <span :class="[step.ordem === 1 ? 'text-black font-medium' : '']">{{
            step.label
          }}</span>
        </li>
      </ul>
      <div
        key="teste2"
        class="flex space-x-2"
      >
        <Button
          variant="dark"
          radius="full"
          :loading="loading"
          text-loading="Salvando..."
          size="sm"
          @click="submitForm"
        >
          Salvar e continuar
        </Button>
        <Button
          v-show="!loading"
          variant="dark"
          radius="full"
          size="sm"
          outline
        >
          Cancelar
        </Button>
      </div>
    </div>

    <CreateProductForm
      ref="child"
      v-model:loading="loading"
      class="m-4 my-16"
    />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import Button from "@/components/UI/Button/Button.vue";
import HeadPage from "@/components/HeadPage.vue";
import CreateProductForm from "../components/CreateProductForm.vue";
interface Step {
  label: string;
  ordem: number;
}
export default defineComponent({
  components: { Button, HeadPage, CreateProductForm },
  setup() {
    const steps = ref<Step[]>([
      { ordem: 1, label: "Dados" },
      { ordem: 2, label: "Links" },
      { ordem: 3, label: "Mídias" },
      { ordem: 4, label: "Ebooks" },
      { ordem: 5, label: "Faq" },
      { ordem: 6, label: "Conversão" },
    ]);
    const loading = ref(false);
    const child = ref<typeof CreateProductForm|null>(null)
    const submitForm = async () => {
      child.value?.submit();
    };
    return {
      steps,
      loading,
      child,
      submitForm,
    };
  }
});
</script>

<style scoped lang="scss">
.steps {
  &::after {
    top: 14px;
    content: "";
    display: block;
    height: 2px;
    width: 100%;
    position: absolute;
    background: #eee;
  }
}

// .slide-enter-active ,
// .slide-leave-active {
//   transition: all .3s forwards;
// }

// .slide-enter-from,
// .slide-leave-to {
//   opacity: 0;
//   transform:translateY(-20px);
// }

.slide-fade-enter-active {
  transition: all 5s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
