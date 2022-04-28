import { FORM } from "@/constants/messages";
import useHelpers from "@/composables/useHelpers";
const { isCpfOrCnpj } = useHelpers();

export const createCompanyRules = {
  company_name: {
    name: "required",
    test: (value: string) => Boolean(value),
    message: FORM.REQUIRED,
  },
  cpf_cnpj: [
    {
      name: "required",
      test: (value: string) => Boolean(value),
      message: FORM.REQUIRED,
    },
    {
      name: "checkCpfCnpj",
      test: (value: string) => isCpfOrCnpj(value),
      message: FORM.CPF_CNPJ_INVALID,
    },
  ],
  tel1: {
    name: "required",
    test: (value: string) => Boolean(value),
    message: FORM.REQUIRED,
  },
  email: [
    {
      name: "required",
      test: (value: string) => Boolean(value),
      message: FORM.REQUIRED,
    },
    {
      name: "emailValid",
      test: (value: string) => /\@/.test(value),
      message: FORM.EMAIL_INVALID,
    },
  ],
  cep: {
    name: "required",
    test: (value: string) => Boolean(value),
    message: FORM.REQUIRED,
  },
  district: {
    name: "required",
    test: (value: string) => Boolean(value),
    message: FORM.REQUIRED,
  },
  address: {
    name: "required",
    test: (value: string) => Boolean(value),
    message: FORM.REQUIRED,
  },
  city: {
    name: "required",
    test: (value: string) => Boolean(value),
    message: FORM.REQUIRED,
  },
  state: {
    name: "required",
    test: (value: string) => Boolean(value),
    message: FORM.REQUIRED,
  },
};
