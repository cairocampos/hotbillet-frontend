export interface IPagination {
  limit: number;
  next_page: boolean;
  offset:number;
  page:number;
  sort: string;
  status: string;
  total: number;
}           