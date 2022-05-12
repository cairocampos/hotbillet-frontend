import { IObjectUnknown } from "@/interfaces/IObjectUnknown";
import { ref } from "vue";
import { Result } from "vue-tiny-validate";
import { FORM } from '../constants/messages'

type Teste = Record<string, string>;

interface Dic {
  [key: string]: string;
}

interface IFormHandler {
  errors: Dic;
  has(field: string): boolean;
  any(): boolean;
  get: (field: string) => string;
  record(errors: Dic): void;
  clear(field?: string): void;
}

type RequiredField = {
  name: string;
  test: (field: string) => boolean;
  message: string;
}

interface IComposition {
  formHandler: IFormHandler;
  removeError: (field?: string) => void;
  getInputError: (key: string, result: Result) => string;
  testInput: (key: string, result: Result) => void;
  requiredField: () => RequiredField
}

export function useFormHandler(): IComposition {
  const handleErrors = ref<IFormHandler>({
    errors: {},
    // Verifica se existe algum erro de um campo específico
    has(field: string) {
      if (this.errors && Object.keys(this.errors).length) {
        return this.errors[field] ? true : false;
      }

      return false;
    },

    // Verifica se existe algum erro
    any() {
      return Object.keys(this.errors).length > 0;
    },

    // Recupera uma mensagem de erro especifico de um campo
    get(field: string) {
      return this.errors[field] ?? "";
    },

    // Registra os erros
    // @ts-ignore
    record(errors: Teste) {
      this.errors = errors;
    },

    clear(field: string) {
      if (field) {
        //@ts-ignore
        delete this.errors[field];

        return;
      }

      this.errors = {};
    },
  });

  const removeError = (field?: string) => handleErrors.value.clear(field);
  
  
  const getInputError = (key: string, result: Result): string => {
    if (result[key]) {
      // @ts-ignore
      return result[key].$invalid ? result[key].$messages[0] : '';
    }

    return ''
  }

  const testInput = (key: string, result: Result): void => {
    if (result[key]) { 
      // @ts-ignore
      result[key].$test()
    }
  };

  const requiredField = () => {
    return {
      name: "required",
      test: (field:string) => Boolean(field),
      message: FORM.REQUIRED
    }
  }

  const validateUrl = () => {
    return {
      name: ""
    }
  }

  return {
    formHandler: handleErrors.value,
    removeError,
    getInputError,
    testInput,
    requiredField
  };
}
