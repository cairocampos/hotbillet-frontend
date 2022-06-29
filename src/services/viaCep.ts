import axios from "axios";

export interface IViacep {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export const viaCep = async (cep: string) => {
  const { data } = await axios.get<IViacep>(`https://viacep.com.br/ws/${cep}/json/`);
  return data;
}