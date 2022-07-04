export interface IPaginationProps {
  per_page: number;
  total: number;
  current_page:number;
  last_page:number;
}

export interface IPagination<T> extends IPaginationProps {
  data: T
}