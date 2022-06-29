import { api } from '@/services/api'
import { ICompanySimple } from "@/modules/companies/interfaces/ICompany";

export const fetchCompanies = () => {
  return api.get<{companies: ICompanySimple[]}>(`/companies/simple`);
} 