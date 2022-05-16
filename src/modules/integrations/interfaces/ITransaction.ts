export interface ITransactionTypes {
  id: number;
  desc: string;
}

export enum Transaction {
  BOLETO_VENCIDO = 1,
  BOLETO_VENCENDO = 2,
  CARTAO_CANCELADO = 3,
  PIX = 4,
  VIRTUAL = 5,
  CARTAO_APROVADO = 6,
  TRANSFERENCIA = 7,
  PIX_APROVADO = 8,
  BOLETO_PAGO = 9,
  CARRINHO_ABANDONADO = 10 
}