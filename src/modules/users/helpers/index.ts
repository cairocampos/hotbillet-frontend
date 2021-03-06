import { requiredField, validateEmail } from '@/helpers/formValidation'
export const userFormRequest = {
  email: [requiredField(), validateEmail()],
  name: requiredField(),
  last_name: requiredField(),
};

export const createUserFormRequest = {
  ...userFormRequest,
  password: requiredField()
}