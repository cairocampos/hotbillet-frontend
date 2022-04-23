export interface ICompanySimple {
  id: number;
  name: string;
  products_total: number;
  sales_month: number;
}

export interface ICompany {
  id: number;
  company_name: string;
  cpf_cnpj: string;
  email: string;
  tel1: string;
  tel2: string;
  cep: string;
  address: string;
  address_number: string;
  complement: string;
  district: string;
  city: string;
  state: string;
}