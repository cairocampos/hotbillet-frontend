export const PROFILES = {
  GERENTE: 3,
  SUPERVISOR: 4,
  VENDEDOR: 5
}

export const PROFILES_NAME = {
  1: 'Super Admin',
  2: 'Admin',
  3: 'Gerente',
  4: 'Supervisor',
  5: 'Vendedor',
}

export const PRODUCT_TYPE = {
  DIGITAL: 1,
  FISICO: 2,
}


export const STATUS = {
  ATIVO: 1,
  INATIVO: 2
}

export const LINKS =  {
  DISCOUNT: 'DISCOUNT',
  CHECKOUT: 'CHECKOUT'
}

export const EVENTS = {
  BOLETO_IMPRESSO: 1,
  BOLETO_VENCIDO: 2,
  CARTAO_CANCELADO: 3,
  ABANDONO: 4,
  BOLETO_PAGO: 5,
  CARTAO_APROVADO: 6,
  PIX_GERADO: 7,
  PIX_PAGO: 8,
}

export const LEAD_STATUS = {
  AGUARDANDO_CONTATO: 1,
  EM_NEGOCIACAO: 2,
  CONVERTIDO: 3,
  FINALIZADO: 4,
  CANCELADO: 5,
  SEM_CONTATO: 6,
  CONTATO_AGENDADO: 7,
  DEVOLVIDO: 8
}

export const LEAD_STATUS_DESCRIPTION = {
  [LEAD_STATUS.AGUARDANDO_CONTATO]:'Aguardando Contato',
  [LEAD_STATUS.EM_NEGOCIACAO]:'Em Negociacao',
  [LEAD_STATUS.CONVERTIDO]:'Convertido',
  [LEAD_STATUS.FINALIZADO]:'Finalizado',
  [LEAD_STATUS.CANCELADO]:'Cancelado',
  [LEAD_STATUS.SEM_CONTATO]:'Sem Contato',
  [LEAD_STATUS.CONTATO_AGENDADO]:'Contato Agendado',
  [LEAD_STATUS.DEVOLVIDO]:'Devolvido',
}