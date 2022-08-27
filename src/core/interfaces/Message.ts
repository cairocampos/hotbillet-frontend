import { IProduct } from "@/interfaces/IProduct";
import { Event } from "./Event";

export interface CreateMessage {
  product_id: number;
  event_ids: number[],
  message: string;
}

export interface Message {
  id: number;
  product_id: number;
  message: string;
  events: Event[],
  product: IProduct;
}