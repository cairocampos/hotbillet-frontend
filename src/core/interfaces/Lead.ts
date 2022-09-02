import { Event } from "./Event";
import { User } from "./User";

interface LeadSeller {
  id:number;
  name:string;
}

interface LeadCustomer {
  id: number;
  name: string;
  phone:string;
}

export interface LeadBasic {
  id:number;
  customer: LeadCustomer;
  product_name:string;
  product_image:string;
  product_id:number;
  status_description:string;
  event: Event;
  created_at:string;
  seller: LeadSeller;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  extra_phone?: any;
  document: string;
  zipcode: string;
  address: string;
  address_number: string;
  complement: string;
  city: string;
  state: string;
  country: string;
  district: string;
  birth_date?: any;
  created_at: Date;
  updated_at: Date;
}

export interface Event {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface Platform {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface Lead {
  id: number;
  customer_id: number;
  platform_id: number;
  integration_id: number;
  seller_id: number;
  event_id: number;
  product_id: number;
  transaction_id: string;
  transaction_start_date: string;
  transaction_payment_date?: string;
  amount: string;
  discount: string;
  total_amount: string;
  shipping_amount: string;
  shipping_description?: string;
  tracking_code?: string;
  billet_digitable_line?: string;
  billet_url: string;
  billet_due_date?: string;
  status: number;
  created_at: string;
  updated_at: string;
  status_description: string;
  customer: Customer;
  event: Event;
  platform: Platform;
  seller: User;
}

export interface LeadHistoric {
  id:number;
  transaction_id:string;
  event_id: number;
  event: Event;
  status_description: string;
  status: number;
  created_at:string;
}