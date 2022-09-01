import { requiredField, validateEmail } from '@/core/helpers/formValidation'
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