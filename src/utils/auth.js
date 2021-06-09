export const TOKEN_KEY = 'Authorization';

export function getToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  return sessionStorage.setItem(TOKEN_KEY, token);
}
