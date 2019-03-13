import { ACCESS_TOKEN } from '../config';

export const getAccessToken = () =>
  sessionStorage.getItem(ACCESS_TOKEN) || localStorage.getItem(ACCESS_TOKEN);

export const login = auth => {
  localStorage.setItem(ACCESS_TOKEN, auth.accessToken);
};

export const logout = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  sessionStorage.removeItem(ACCESS_TOKEN);
};
