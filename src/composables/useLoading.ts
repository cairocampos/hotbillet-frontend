import { Ref, ref } from "vue";

interface ILoading {
  primary: boolean;
  secondary: boolean;
}

interface IComposition {
  loading: Ref<ILoading>
}

export default function useLoading(): IComposition {
  const loading = ref<ILoading>({
    primary:false,
    secondary: false
  })

  return {
    loading
  }
}