import { Lead, LeadBasic, LeadHistoric } from "@/core/interfaces/Lead";
import { Pagination } from "@/core/interfaces/Pagination";
import { api } from "./base";

export const leadService = {
  all: () => api.get<Pagination<LeadBasic[]>>('/leads'),
  findById: (id:number) => api.get<Lead>(`/leads/${id}`),
  historic: (id:number) => api.get<LeadHistoric[]>(`/leads/${id}/historic`),
  feeds: (id:number) => api.get(`/leads/${id}/feeds`),
  messages: (id:number) => api.get(`/leads/${id}/messages`)
}