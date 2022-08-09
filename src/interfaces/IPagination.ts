export interface IPagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface IPaginationData<T> extends IPagination {
  data: T
}