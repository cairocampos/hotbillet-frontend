import { ProductEbook } from "@/core/interfaces/Product";
import { api } from "./base";

export const fetchEbooks = (product_id:number) => api.get<ProductEbook[]>(`/products/${product_id}/ebooks`);