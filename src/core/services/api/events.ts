import { Event } from "@/core/interfaces/Event";
import { api } from "./base";

export const fetchEvents = () => api.get<Event[]>('/events');