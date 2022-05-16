import { api } from '@/services'
import { ITransactionTypes } from "../interfaces/ITransaction";
import { ICheckout } from "../interfaces/ICheckout";

export const fetchTransactionTypes = () => {
  return api.get<{transactions_types: ITransactionTypes[]}>(`/transaction/types`);
}

export const fetchCheckouts = () => {
  return api.get<{checkouts: ICheckout[]}>(`/checkouts/simple`);
}