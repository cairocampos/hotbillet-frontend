import { CustomerHistoric } from "@/core/interfaces/Customer";
import { api } from "./base";

export const customerService = {
  historic: (id:number) => api.get<CustomerHistoric[]>(`/customers/${id}/historic`),}