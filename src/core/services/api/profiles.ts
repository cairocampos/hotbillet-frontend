import { Profile } from "@/core/interfaces/Profile";
import { api } from "./base";

export const fetchProfiles = () => api.get<Profile[]>('/profiles');