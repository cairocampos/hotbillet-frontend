import { Result } from 'vue-tiny-validate'
import {isValidURL, isEmail, isCpfOrCnpj} from './validations'

const FORM = {
  REQUIRED: "Campo obrigatório",
  CPF_CNPJ_INVALID: "Documento inválido",
  EMAIL_INVALID: "Email inválido",
  INVALID: "Campo inválido"
};

export const getInputError = (key: string, result: Result): string => {
  if (result[key]) {
    // @ts-ignore
    return result[key].$invalid ? result[key].$messages[0] : '';
  }

  return ''
}

export const testInput = (key: string, result: Result): void => {
  if (result[key]) { 
    // @ts-ignore
    result[key].$test()
  }
};

export const requiredField = (message = "") => {
  return {
    name: "required",
    test: (field:string) => Boolean(field),
    message: message || FORM.REQUIRED,
    required:true
  }
}

export const validateUrl = () => {
  return {
    name: "valid",
    test: (field:string) => isValidURL(field),
    message: "Link inválido"
  }
}

export const validateEmail = () => {
  return {
    name: "email",
    test: (field:string) => isEmail(field),
    message: FORM.EMAIL_INVALID
  }
}

export const validateCnpj = () => {
  return {
    name: "email",
    test: (field:string) => isCpfOrCnpj(field),
    message: FORM.EMAIL_INVALID
  }
}