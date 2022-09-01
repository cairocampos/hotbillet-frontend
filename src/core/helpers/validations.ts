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
  return value.replace(/([0-9]{2})([0-9]{1})([0-9]{4})([0-9]{4})/, '($1) $2 $3-$4')
}

export const isValidURL = (url: string) => {
  return /^(http|www)/.test(url);
}

export const isEmail = (email: string) => {
  return /\@/.test(email);
}