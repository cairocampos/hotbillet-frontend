import { useDateTime } from "../composables/useDateTime";

export const generateId = function () {
  return Date.now().toString(32).substr(4) + '_' + Math.random().toString(36).substr(2, 9);
};

export const debounce = (fn: () => any, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: []) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

export const brazilianStates = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];

export const ucword = (value: string) => {
  return `${value.at(0)?.toUpperCase()}${value.substr(1).toLowerCase()}`;
};

export const onlyNumbers = (value: string) => value.replace(/\D/g, "");

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
  return value.replace(/^55/, '').replace(/([0-9]{2})([0-9]{1})([0-9]{4})([0-9]{4})/, '($1) $2 $3-$4')
}

export const generatePassword = (length: number) => {
  const pass = Date.now().toString(36).slice(-6);
  return (pass + btoa(pass)).slice(-`${length}`);
}

export const firstName = (value: string) => value.split(" ")[0]


const { dateDiffNow } = useDateTime()
export const getDateDiff = (date:string) => {
  const diff = dateDiffNow(date);
  if(diff?.days) {
    return `${diff.days} atrás`;
  }

  if(diff.hours) {
    return `${diff.hours}hr atrás`
  }

  if(diff.minutes) {
    return `${diff.minutes} min`
  }
}