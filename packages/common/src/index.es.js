import { object, string } from 'yup';

// eslint-disable-next-line
const isEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const isPhone = /^(\+|0)(\d{9,12})$/;
const isShortPhone = /^\+?\d{3,12}$/;

const loginValidation = object().shape({
  credential: string().required('Nhập định danh để đăng nhập'),
  password: string().required('Nhập mật khẩu để đăng nhập')
}); // export const registerContactValidation = Yup.object().shape({
//   source:
// })

export { isEmail, isPhone, isShortPhone, loginValidation };
//# sourceMappingURL=index.es.js.map
