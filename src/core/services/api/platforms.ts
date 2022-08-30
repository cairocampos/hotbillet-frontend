import { Platform } from "@/core/interfaces/Platform";
import { api } from "./base";

export const fetchPlatforms = () => api.get<Platform[]>('/platforms');