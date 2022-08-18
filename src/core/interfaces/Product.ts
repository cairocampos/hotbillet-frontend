export interface ProductEbook {
  id: number;
  title: string;
  url:string;
}

export interface ProductMedia {
  id?: number;
  type: 1 | 2;
  type_description: 'IMAGE' | 'VIDEO',
  url: string;
}

export enum MediaTypeEnum {
  IMAGE = 1,
  VIDEO = 2
}