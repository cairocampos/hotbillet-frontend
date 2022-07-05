export interface ICompanyMetrics {
  id: number;
  name: string;
  products_total: number;
  sales_month: number;
}

export interface ICompany {
  id: number;
  name:string;
  producer_name?: string;
  support_email: string;
  support_phone: string;
  cnpj: string;
}