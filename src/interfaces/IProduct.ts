export type ProductType = "FISICO" | "DIGITAL";
export type ProductStatus = "ATIVO" | "INATIVO";

export interface IProductData {
  id?: number;
  name: string;
  company_id: number;
  url: string;
  type: number;
  type_description: string;
  status: number;
  support_email?: string;
  support_phone?: string;
  description: string;
  cover?: string;
}

export interface IProductLink {
  id?: number;
  url: string;
  name:string;
}

export interface IProductEbook {
  id?: number;
  title: string;
  url: string;
}

export interface IProductImage {
  id?: number;
  type: 'IMAGE';
  description: string;
  url: string;
}

export interface IProductVideo {
  id?: number;
  nome:string;
  url: string;
}

export interface IProductFaq {
  id?: number;
  title:string;
  description:string;
}

export interface IProductCheckout {
  id?: number;
  link_type: string;
  description: string;
  url: string;
}

export interface IProduct extends IProductData {
  links?: IProductLink[];
  ebooks?: IProductEbook[];
  images?: IProductImage[];
  videos?: IProductVideo[];
  faqs?: IProductFaq[];
  checkouts?: IProductCheckout[];
}


