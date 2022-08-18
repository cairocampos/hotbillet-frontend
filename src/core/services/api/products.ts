import { ProductEbook, ProductMedia } from "@/core/interfaces/Product";
import { api } from "./base";

export const fetchEbooks = (product_id:number) => api.get<ProductEbook[]>(`/products/${product_id}/ebooks`);

export const fetchMidias = (product_id: number) => api.get<ProductMedia[]>(`/products/${product_id}/midias`);
export const createMidias = (product_id: number, data: FormData) => api.post<ProductMedia[]>(`/products/${product_id}/midias`, data);