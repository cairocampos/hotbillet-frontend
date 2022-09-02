import { Integration } from "@/core/interfaces/Integration";
import { CreateMessage } from "@/core/interfaces/Message";
import { ProductCoupon, ProductEbook, ProductImage, ProductMedia, ProductMessage } from "@/core/interfaces/Product";
import { Pagination } from "@/core/interfaces/Pagination";
import { Product } from "@/core/interfaces/Product";
import { api } from "./base";

export const fetchProducts = () => api.get<Pagination<Product[]>>('/products');
export const fetchProduct = (id: number) => api.get<Product>(`/products/${id}`)
export const fetchEbooks = (product_id:number) => api.get<ProductEbook[]>(`/products/${product_id}/ebooks`);
export const fetchMidias = (product_id: number) => api.get<ProductMedia[]>(`/products/${product_id}/midias`);
export const createMidias = (product_id: number, data: FormData) => api.post<ProductMedia[]>(`/products/${product_id}/midias`, data);
export const fetchCoupons = (product_id: number) => api.get<ProductCoupon[]>(`/products/${product_id}/coupons`);
export const createCoupons = (product_id: number, data: {coupons: ProductCoupon[], deleted_ids?: number[]}) => {
  return api.put<ProductCoupon[]>(`/products/${product_id}/coupons`, data);
}
export const fetchImages = (product_id:number) => api.get<ProductImage[]>(`/products/${product_id}/images`);
export const fetchMessages = (product_id: number) => api.get<Pagination<ProductMessage[]>>(`/products/${product_id}/messages`);
export const createMessage = (product_id: number, data: CreateMessage) => api.post<ProductMessage>(`/products/${product_id}/messages`, data);
export const updateMessage = (product_id: number, message_id:number, data: CreateMessage) => api.put<ProductMessage>(`/products/${product_id}/messages/${message_id}`, data);
export const destroyMessage = (product_id: number, message_id:number) => api.delete(`/products/${product_id}/messages/${message_id}`);
export const createIntegration = (product_id: number, data: any) => api.post<Integration>(`/products/${product_id}/integrations`, data)

export const productService = {
  all: () => api.get<Pagination<Product[]>>('/products'),
  findById: (id:number) => api.get<Product>(`/products/${id}`)
}