export type ProductType = "FISICO" | "DIGITAL";
export type ProductStatus = "ATIVO" | "INATIVO";

export interface IProductData {
  id?: number;
  name: string;
  company_id: number;
  url: string;
  product_type: ProductType;
  status: ProductStatus;
  support_email?: string;
  support_tel?: string;
  description: string;
}

export interface IProductLink {
  id?: number;
  link_type: string;
  description: string;
  url: string;
}

export interface IProductEbook {
  id?: number;
  description: string;
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


