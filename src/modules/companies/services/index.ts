import { api } from '@/services'
import { ICompanySimple } from "@/modules/companies/interfaces/ICompany";

export const fetchCompanies = () => {
  return api.get<{companies: ICompanySimple[]}>(`/companies/simple`);
} 