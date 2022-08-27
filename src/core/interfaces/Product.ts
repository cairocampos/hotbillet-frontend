import { Event } from "./Event";

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