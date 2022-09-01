import { ref } from "vue";
import { Data, Option, Result, Rule, Rules } from "vue-tiny-validate";

type Teste = Record<string, string>;

interface Dic {
  [key: string]: string;
}

export interface Validator {
  result: Result,
  field: string
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

type Transform = ((value: any, data?: Data, rules?: Rules, option?: Option) => Result | any);

interface IComposition {
  formHandler: IFormHandler;
  removeError: (field?: string) => void;
  getInputError: (key: string, result: Result) => string;
  testInput: (key: string, result: Result) => void;
  requiredField: () => RequiredField,
  transform: Transform
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

  const transform: Transform = (value, data, rules) => {
    const bools: boolean[] = []
    if(typeof data === "object" && rules) {
      Object.entries(data).forEach(([key, value]) => {
        const fieldRule = rules[key] as Rule
        if(fieldRule) {
          if(!Array.isArray(fieldRule) && fieldRule.test) {
            const test = fieldRule?.test(value) as boolean
            bools.push(test);
          } else if(Array.isArray(fieldRule)) {
            fieldRule.forEach(rule => {
              bools.push(rule.test(value))
            })
          }
        }
      });
    }

    const isInvalid = bools.some(val => !val);
    return {...value, $invalid: isInvalid}
  }

  const requiredField = () => {
    return {
      name: "required",
      test: (field:string) => Boolean(field),
      message: "Campo obrigatório"
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
    requiredField,
    transform
  };
}
