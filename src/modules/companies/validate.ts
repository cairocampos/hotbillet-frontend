import { FORM } from "@/constants/messages";
import useHelpers from "@/composables/useHelpers";
const { isCpfOrCnpj } = useHelpers();

export const createCompanyRules = {
  name: {
    name: "required",
    test: (value: string) => Boolean(value),
    message: FORM.REQUIRED,
  },
  cnpj: [
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
  support_phone: {
    name: "required",
    test: (value: string) => Boolean(value),
    message: FORM.REQUIRED,
  },
  support_email: [
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
  ]
};
