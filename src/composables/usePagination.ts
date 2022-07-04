import {IPaginationProps} from "@/interfaces/IPagination";
import { computed, Ref, ref } from "vue";

type IComposition = {
  pagination: Ref<IPaginationProps>;
  nextPage: (callback: () => unknown) => void;
  previousPage: (callback: () => unknown) => void;
  resetPagination: (callback: () => unknown) => void;
};

export default function usePagination(): IComposition {
  const INITIAL_PAGE = 1;
  const pagination = ref<IPaginationProps>({
    current_page: 1,
    per_page: 10,
    total: 0,
    last_page: 1
  });


  const hasPage = computed(() => pagination.value.current_page < pagination.value.last_page)

  const nextPage = (callback: () => unknown) => {
    if(!hasPage.value) return;
    pagination.value.current_page++;
    callback();
  };

  const previousPage = (callback: () => unknown) => {
    if(pagination.value.current_page == 1) return;
    pagination.value.current_page--;
    callback();
  };

  const resetPagination = (callback: () => unknown) => {
    pagination.value.current_page = INITIAL_PAGE;
    callback();
  }

  return {
    pagination,
    nextPage,
    previousPage,
    resetPagination,
  };
}