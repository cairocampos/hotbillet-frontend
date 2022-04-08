<template>
  <div>
    <HeadPage class="mb-10">
      <h1 class="text-2xl text-gray-600">
        Novo Produto
      </h1>
    </HeadPage>

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
            <span
              :class="[step.ordem === 1 ? 'text-black font-medium' : '']"
            >{{ step.ordem }}º</span>
          </div>
          <span :class="[step.ordem === 1 ? 'text-black font-medium' : '']">{{
            step.label
          }}</span>
        </li>
      </ul>
      <transition name="slide">
        <div
          v-if="loading"
          key="teste1"
        >
          <button
            class="btn btn-sm btn-dark rounded-full flex space-x-2 items-center"
          >
            <Loading class="h-5 w-5" />
            <span>Salvando...</span>
          </button>
        </div>
        <div
          v-else
          key="teste2"
          class="space-x-2"
        >
          <Button
            :loading="loading"
            :disabled="loading"
            title="Salvar e Continuar"
            class="btn btn-sm btn-dark rounded-full"
            @click="submitForm"
          />
          <button class="btn btn-sm btn-outline-secondary rounded-full">
            Cancelar
          </button>
        </div>
      </transition>
    </div>

    <section class="m-4 my-16">
      <form class="lg:grid lg:grid-cols-2 lg:gap-32 form-sm">
        <div class="space-y-12">
          <div class="form-group">
            <label
              for=""
              class="label"
            >Nome do Produto</label>
            <input
              v-model="form.name"
              type="text"
              class="form-control form-control-line"
              :class="{error: formHandler.has('name')}"
              @input="formHandler.clear('name')"
            />
            <InputInfo
              :handler="formHandler"
              field="name"
            />
          </div>
          <div class="form-group">
            <label
              for=""
              class="label"
            >Subtitulo</label>
            <input
              v-model="form.abbreviation"
              type="text"
              class="form-control form-control-line"
            />
          </div>
          <div class="form-group">
            <label
              for=""
              class="label"
            >Link do Produto</label>
            <input
              v-model="form.url"
              type="text"
              class="form-control form-control-line"
              placeholder="Cole aqui a URL da página do produto"
            />
          </div>
          <div class="form-group">
            <label
              for=""
              class="label"
            >Tipo de Produto</label>
            <select
              v-model="form.product_type"
              class="form-control form-control-line"
            >
              <option
                v-for="product_type in PRODUCT_TYPE"
                :key="product_type"
                :value="product_type"
              >
                {{ product_type }}
              </option>
            </select>
          </div>
        </div>

        <div class="mt-10 md:mt-0 space-y-12">
          <div class="form-group">
            <label class="label">Contato do Suporte</label>
            <div class="input-group input-group-line">
              <div class="input-prepend mr-2">
                <span class="text-default">
                  Telefone:
                </span>
              </div>
              <input
                v-model="form.support_tel"
                v-maska="'(##) #####-####'"
                type="text"
                placeholder="(xx) xxxxx-xxxx"
                class="bg-transparent outline-none"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="label" />
            <div class="input-group input-group-line">
              <div class="input-prepend mr-2">
                <span class="text-default">
                  Email:
                </span>
              </div>
              <input
                v-model="form.support_email"
                type="text"
                placeholder="suporte@suporte.com"
                class="bg-transparent outline-none"
              />
            </div>
          </div>
          <div class="form-group">
            <label
              for=""
              class="label"
            >Descrição do Produto</label>
            <textarea
              v-model="form.description"
              class="form-control form-control-line border rounded-sm"
              placeholder="Descreva o produto aqui"
              rows="10"
            />
          </div>
        </div>
      </form>
    </section>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import useNotifications from "@/composables/useNotifications";
import { IProduct, IProductData } from "@/interfaces/IProduct";
import { useRouter } from "vue-router";
import useConstants from "@/composables/useConstants";
import { api } from "@/services";
import { useFormHandler } from "@/composables/useFormHandler";
interface Step {
  label: string;
  ordem: number;
}
export default defineComponent({
  setup() {
    const { PRODUCT_TYPE } = useConstants();
    const router = useRouter();
    const steps = ref<Step[]>([
      { ordem: 1, label: "Dados" },
      { ordem: 2, label: "Links" },
      { ordem: 3, label: "Mídias" },
      { ordem: 4, label: "Ebooks" },
      { ordem: 5, label: "Faq" },
      { ordem: 6, label: "Conversão" },
    ]);
    const form = ref<IProductData>({
      name: "",
      abbreviation: "",
      company_id: 1,
      url: "",
      product_type: "FISICO",
      status: "ATIVO",
      support_email: "",
      support_tel: "",
      description: "",
    });
    const loading = ref(false);

    const { formHandler } = useFormHandler();
    const checkForm = () => {
      const {
        name
      } = form.value;
      if (!name) {
        formHandler.record({ name: "O campo nome é obrigatório." });
      }
    };

    const { notifications } = useNotifications();
    const submitForm = async () => {
      checkForm();
      if (formHandler.any()) return;

      try {
        loading.value = true;
        const { data } = await api.post<IProduct>("/products", form.value);
        notifications.success("Continue cadastrando os dados do seu produto.");
        router.push({
          name: "EditarProduto",
          params: { id: data.id },
          query: { redirect: 1 },
        });
      } catch (error) {
        notifications.error(error);
      } finally {
        loading.value = false;
      }
    };

    return {
      steps,
      loading,
      form,
      submitForm,
      PRODUCT_TYPE,
      formHandler,
    };
  },
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
