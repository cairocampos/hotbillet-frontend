import { Result } from 'vue-tiny-validate'
import {FORM} from '../constants/messages'
import {isValidURL, isEmail} from './index'

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

export const requiredField = () => {
  return {
    name: "required",
    test: (field:string) => Boolean(field),
    message: FORM.REQUIRED,
    required:true
  }
}

export const validateUrl = () => {
  return {
    name: "valid",
    test: (field:string) => isValidURL(field),
    message: FORM.INVALID
  }
}

export const validateEmail = () => {
  return {
    name: "email",
    test: (field:string) => isEmail(field),
    message: FORM.EMAIL_INVALID
  }
}