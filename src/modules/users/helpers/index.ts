import { requiredField, validateEmail } from '@/helpers/formValidation'
export const userFormRequest = {
  email: [requiredField(), validateEmail()],
  name: requiredField(),
  supervisor_id: {},
  profile_id: requiredField()
};

export const createUserFormRequest = {
  ...userFormRequest,
  password: requiredField()
}