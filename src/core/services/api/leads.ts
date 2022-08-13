import { Lead } from "@/core/interfaces/Lead";
import { IPagination } from "@/interfaces/IPagination";
import { api } from "./base";

export const fetchLeads = () => api.get<IPagination<Lead[]>>('/leads');