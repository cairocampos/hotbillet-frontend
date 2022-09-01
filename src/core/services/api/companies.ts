import { Company } from "@/core/interfaces/Company";
import { Pagination } from "@/core/interfaces/Pagination";
import { api } from "./base";

export const fetchCompany = (id: number) => api.get(`/companies/${id}`);
export const fetchCompanies = (params?: object) => api.get<Pagination<Company[]>>('/companies', {params});