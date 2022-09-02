import { Event } from "./Event";

export type ProductType = "FISICO" | "DIGITAL";
export type ProductStatus = "ATIVO" | "INATIVO";

export interface Product {
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
  created_at: string;
}

export interface ProductEbook {
  id: number;
  title: string;
  url:string;
}

export interface ProductMedia {
  id?: number;
  type?: 1 | 2;
  type_description?: 'EBOOK' | 'VIDEO',
  url: string;
  title: string;
}

export enum MediaTypeEnum {
  EBOOK = 1,
  VIDEO = 2
}

export interface ProductCoupon {
  id?: number;
  title:string;
  code: string;
}

export interface ProductImage {
  id?:number;
  url:string;
  cover:boolean;
}

export interface ProductMessage {
  id?:number;
  product_id?:number;
  message:string;
  events: Event[],
}

export interface ProductLink {
  id?:number;
  url:string;
  name:string;
}

export interface ProductFaq {
  id?:number;
  title: string;
  description:string;
}