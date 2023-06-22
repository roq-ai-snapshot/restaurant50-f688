import * as yup from 'yup';

export const tableStatusValidationSchema = yup.object().shape({
  status: yup.string().required(),
});
