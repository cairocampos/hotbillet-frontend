import { User, UserData } from "@/core/interfaces/User";
import { Pagination } from "@/core/interfaces/Pagination";
import { api } from "./base";

export const fetchUsers = (params = {}) => api.get<Pagination<User[]>>('/users', {params});

export const fetchUser = (user_id: number) => api.get<User>(`/users/${user_id}`);

export const updateUser = (user_id: number, data: UserData) => api.put<User>(`/users/${user_id}`, data);