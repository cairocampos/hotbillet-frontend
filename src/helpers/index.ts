export const brazilianStates = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];

export const ucword = (value: string) => {
  return `${value.at(0)?.toUpperCase()}${value.substr(1).toLowerCase()}`;
};

export const onlyNumbers = (value: string) => value.replace(/\D/g, "");

export const isCpfOrCnpj = (value: string) => {
  const cpf = /([0-9]{3})(\.)?([0-9]{3})(\.)?([0-9]{3})(\-)?([0-9]{2})/;
  const cnpj =
    /([0-9]{2})(\.)?([0-9]{3})(\.)?([0-9]{3})(\/)?([0-9]{4})(\-)?([0-9]{2})/;

  return cpf.test(value) || cnpj.test(value);
};

export const maskCpfOrCnpj = (value: string) => {
  if (value.length == 11) {
    return value.replace(
      /([0-9]{3})([0-9]{3})([0-9]{3})([0-9]{2})/,
      "$1.$2.$3-$4"
    );
  }

  return value.replace(
    /([0-9]{2})([0-9]{3})([0-9]{3})([0-9]{4})([0-9]{2})/,
    "$1.$2.$3/$4-$5"
  );
};

export const maskPhone = (value: string) => {
  // (33) 9 9140-9852
  return value.replace(/([0-9]{2})([0-9]{1})([0-9]{4})([0-9]{4})/, '($1) $2 $3-$4')
}