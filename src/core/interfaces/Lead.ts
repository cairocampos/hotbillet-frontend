import { Event } from "./Event";

interface LeadSeller {
  id:number;
  name:string;
}

export interface Lead {
  id:number;
  customer_name:string;
  customer_phone:string;
  product_name:string;
  status_description:string;
  event: Event;
  created_at:Date;
  seller: LeadSeller;
}