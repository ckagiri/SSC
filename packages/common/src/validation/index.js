import * as Yup from 'yup';
import { set } from 'lodash';

Yup.setLocale({
  mixed: {
    required: 'Cần nhập',
  },
});

// convert yup valitation error to errors objects
export const processValidationError = e => {
  let errors;
  const setErrorMsg = err => {
    if (err.inner.length === 0) {
      errors = err.path ? set(errors || {}, err.path, err.message) : err.message;
    } else {
      err.inner.forEach(er => {
        setErrorMsg(er);
      });
    }
  };
  setErrorMsg(e);
  return errors;
};

export const loginValidation = Yup.object().shape({
  from: Yup.string(),
  credential: Yup.string().required(),
  password: Yup.string().required(),
});

export const sourceValidation = Yup.object().shape({
  from: Yup.string().required(),
});

export const registerContactValidation = Yup.object().shape({
  lastName: Yup.string().required(),
  phone: Yup.string().required(),
  category: Yup.string().default('Customer'),
});

export const addressValidation = Yup.object().shape({
  street: Yup.string(),
  city: Yup.string().when('street', {
    is: s => !!s,
    then: Yup.string().required(),
    otherwise: Yup.string().notRequired(),
  }),
  town: Yup.string().when('street', {
    is: s => !!s,
    then: Yup.string().required(),
    otherwise: Yup.string().notRequired(),
  }),
});

export const heightValidation = Yup.number('')
  .min(100, 'Chiều cao phải trên 100cm')
  .max(200, 'Chiều cao không quá 200cm');

export const weightValidation = Yup.number('')
  .min(5, 'Cân nặng phải trên 5kg')
  .max(200, 'Cân nặng không quá 200kg');

export const timeValidation = Yup.number('')
  .min(5, 'Cân nặng phải trên 5kg')
  .max(200, 'Cân nặng không quá 200kg');
