import { setLocale, object, string, number } from 'yup';
import { set } from 'lodash';

const bmiLevels = [{
  bmi: 27,
  level: 'error'
}, {
  bmi: 25,
  level: 'extreme'
}, {
  bmi: 23,
  level: 'high'
}, {
  bmi: 21,
  level: 'medium'
}, {
  bmi: 18.5,
  level: 'normal'
}, {
  bmi: 0,
  level: 'low'
}];
const bmiToKg = (height, bmi) => height > 100 && height < 200 ? Math.round(height * height * bmi / 10000) : null;
const bmi = (height, weight) => height > 100 && height < 200 && weight > 30 && weight < 300 ? Math.round(weight * 100000 / height / height) / 10 : null;
const getBmiLevel = index => bmiLevels.find(level => index >= level.bmi);
const toLose = (height, weight) => weight - bmiToKg(height, 23) >= 1 ? `${weight - bmiToKg(height, 23)} -  ${weight - bmiToKg(height, 21)}` : weight - bmiToKg(height, 22) >= 1 ? `${weight - bmiToKg(height, 21)} -  ${weight - bmiToKg(height, 20)}` : weight - bmiToKg(height, 20) >= 1 ? `${weight - bmiToKg(height, 20)}` : null;

// eslint-disable-next-line
const isEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const isPhone = /^(\+|0)(\d{9,12})$/;
const isShortPhone = /^\+?\d{3,12}$/;

setLocale({
  mixed: {
    required: 'Cần nhập'
  }
}); // convert yup valitation error to errors objects

const processValidationError = e => {
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
const loginValidation = object().shape({
  from: string(),
  credential: string().required(),
  password: string().required()
});
const sourceValidation = object().shape({
  from: string().required()
});
const registerContactValidation = object().shape({
  lastName: string().required(),
  phone: string().required(),
  category: string().default('Customer')
});
const addressValidation = object().shape({
  street: string(),
  city: string().when('street', {
    is: s => !!s,
    then: string().required(),
    otherwise: string().notRequired()
  }),
  town: string().when('street', {
    is: s => !!s,
    then: string().required(),
    otherwise: string().notRequired()
  })
});
const heightValidation = number('').min(100, 'Chiều cao phải trên 100cm').max(200, 'Chiều cao không quá 200cm');
const weightValidation = number('').min(5, 'Cân nặng phải trên 5kg').max(200, 'Cân nặng không quá 200kg');
const timeValidation = number('').min(5, 'Cân nặng phải trên 5kg').max(200, 'Cân nặng không quá 200kg');

export { addressValidation, bmi, bmiLevels, bmiToKg, getBmiLevel, heightValidation, isEmail, isPhone, isShortPhone, loginValidation, processValidationError, registerContactValidation, sourceValidation, timeValidation, toLose, weightValidation };
//# sourceMappingURL=index.es.js.map
