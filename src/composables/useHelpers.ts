export default function useHelpers() {
  const ucword = (value: string) => {
    return `${value.at(0)?.toUpperCase()}${value.substr(1).toLowerCase()}`;
  }

  const onlyNumbers = (value: string) => value.replace(/\D/g, "");

  const isCpfOrCnpj = (value: string) => {
    const cpf = /([0-9]{3})(\.)?([0-9]{3})(\.)?([0-9]{3})(\-)?([0-9]{2})/;
    const cnpj =
      /([0-9]{2})(\.)?([0-9]{3})(\.)?([0-9]{3})(\/)?([0-9]{4})(\-)?([0-9]{2})/;

    return cpf.test(value) || cnpj.test(value);
  };

  const maskCpfOrCnpj = (value: string) => {
    if (value.length == 11) {
      return value.replace(/([0-9]{3})([0-9]{3})([0-9]{3})([0-9]{2})/, '$1.$2.$3-$4');
    }

    return value.replace(
      /([0-9]{2})([0-9]{3})([0-9]{3})([0-9]{4})([0-9]{2})/,
      "$1.$2.$3/$4-$5"
    );
  }
  

  const brazilianStates = [
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

  return {
    ucword,
    onlyNumbers,
    isCpfOrCnpj,
    brazilianStates,
    maskCpfOrCnpj
  };
}