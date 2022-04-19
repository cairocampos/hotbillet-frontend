import {IPagination} from "@/interfaces/IPagination";
import { Ref, ref } from "vue";

type IComposition = {
  pagination: Ref<IPagination>;
  nextPage: (callback: () => unknown) => void;
  previousPage: (callback: () => unknown) => void;
  resetPagination: (callback: () => unknown) => void;
};

export default function usePagination(): IComposition {
  const INITIAL_PAGE = 1;
  const pagination = ref<IPagination>({
    limit: 10,
    next_page:false,
    offset:0,
    page: INITIAL_PAGE,
    sort: 'id desc',
    status: 'ATIVO',
    total: 0
  });


  const nextPage = (callback: () => unknown) => {
    pagination.value.page++;
    callback();
  };

  const previousPage = (callback: () => unknown) => {
    pagination.value.page--;
    callback();
  };

  const resetPagination = (callback: () => unknown) => {
    pagination.value.page = INITIAL_PAGE;
    callback();
  }

  return {
    pagination,
    nextPage,
    previousPage,
    resetPagination,
  };
}