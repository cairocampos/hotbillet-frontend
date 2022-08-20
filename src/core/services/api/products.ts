import { ProductCoupon, ProductEbook, ProductImage, ProductMedia } from "@/core/interfaces/Product";
import { api } from "./base";

export const fetchEbooks = (product_id:number) => api.get<ProductEbook[]>(`/products/${product_id}/ebooks`);

export const fetchMidias = (product_id: number) => api.get<ProductMedia[]>(`/products/${product_id}/midias`);
export const createMidias = (product_id: number, data: FormData) => api.post<ProductMedia[]>(`/products/${product_id}/midias`, data);

export const fetchCoupons = (product_id: number) => api.get<ProductCoupon[]>(`/products/${product_id}/coupons`);
export const createCoupons = (product_id: number, data: {coupons: ProductCoupon[], deleted_ids?: number[]}) => {
  return api.put<ProductCoupon[]>(`/products/${product_id}/coupons`, data);
}


export const fetchImages = (product_id:number) => api.get<ProductImage[]>(`/products/${product_id}/images`);