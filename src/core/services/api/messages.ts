import { Message } from "@/core/interfaces/Message";
import { IPagination } from "@/interfaces/IPagination";
import { api } from "./base";
export const fetchMessages = () => api.get<IPagination<Message[]>>('/messages');