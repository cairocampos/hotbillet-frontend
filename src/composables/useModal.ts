import { Ref, ref } from "vue";

interface Composition {
  modalAtivo: Ref;
  showModal: () => void;
}

export default function useModal(): Composition {
  const modalAtivo = ref(false);

  const showModal = () => {
    modalAtivo.value = true;
  };

  return {
    modalAtivo,
    showModal,
  };
}
