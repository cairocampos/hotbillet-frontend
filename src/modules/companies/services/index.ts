import { api } from '@/core/services/api/base'
// import { ICompanySimple } from "@/modules/companies/interfaces/ICompany";

export const fetchCompanies = () => {
  return api.get<{companies: []}>(`/companies/simple`);
} 