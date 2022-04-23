import { ref } from "vue";

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

type Message = { [key: string]: string | number | {[key:string]: string}}
interface IComposition {
  formHandler: IFormHandler;
  removeError: (field?: string) => void;
  getInputError: (key: string, result: Message) => string;
  testInput: (key: string, result: Message) => void;
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

  
  
  const getInputError = (key: string, result: Message): string => {
    if (result[key]) {
      // @ts-ignore
      return result[key].$invalid ? result[key].$messages[0] : '';
    }

    return ''
  }

  const testInput = (key: string, result: Message): void => {
    if (result[key]) { 
      // @ts-ignore
      result[key].$test()
    }
  };

  return {
    formHandler: handleErrors.value,
    removeError,
    getInputError,
    testInput,
  };
}
