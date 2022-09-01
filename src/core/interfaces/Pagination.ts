export interface PaginationProps {
  per_page: number;
  total: number;
  current_page:number;
  last_page:number;
}

export interface Pagination<T> extends PaginationProps {
  data: T
}