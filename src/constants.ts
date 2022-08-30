export const PROFILES = {
  SUPER_ADMIN: 1,
  ADMIN: 2,
  SUPERVISOR: 3,
  VENDEDOR: 4,
}

export const PROFILES_NAME: {[key: number]:string} = {
  1: 'Super Admin',
  2: 'Admin',
  3: 'Empresa',
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

export const MIDIAS_TYPES = {
  THUMBNAIL: 'THUMBNAIL',
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  EBOOK: 'EBOOK',
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