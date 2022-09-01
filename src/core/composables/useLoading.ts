import { Ref, ref } from "vue";

interface ILoading {
  primary: boolean;
  secondary: boolean;
}

interface IComposition {
  loading: Ref<ILoading>,
  isLoading: Ref<{[key:string]: boolean}>
}

export default function useLoading(): IComposition {
  const isLoading = ref<{[key:string]: boolean}>({});
  const loading = ref<ILoading>({
    primary:false,
    secondary: false
  })

  return {
    loading,
    isLoading
  }
}