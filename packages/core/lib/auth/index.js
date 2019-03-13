import { ACCESS_TOKEN } from '../config';
export var getAccessToken = function getAccessToken() {
  return sessionStorage.getItem(ACCESS_TOKEN) || localStorage.getItem(ACCESS_TOKEN);
};
export var login = function login(auth) {
  localStorage.setItem(ACCESS_TOKEN, auth.accessToken);
};
export var logout = function logout() {
  localStorage.removeItem(ACCESS_TOKEN);
  sessionStorage.removeItem(ACCESS_TOKEN);
};