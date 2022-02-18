import {IPagination} from "@/interfaces/IPagination";
import { Ref, ref } from "vue";

type IComposition = {
  pagination: Ref<IPagination>
}

export default function usePagination(): IComposition {
  const pagination = ref<IPagination>({
    limit: 10,
    next_page:false,
    offset:0,
    page: 1,
    sort: 'id desc',
    status: 'ATIVO',
    total: 0
  });

  return {
    pagination
  }
}