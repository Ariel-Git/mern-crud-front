const BASE_URL = 'http://localhost:5000/api';

/*
 *   Users Requests End Points
 */
const USERS = `${BASE_URL}/users`;
export const REGISTER_USER = `${USERS}/register`;
export const LOGIN_USER = `${USERS}/login`;
export const LOGOUT_USER = `${USERS}/logout`;
export const UPDATE_USER = `${USERS}`,
  DELETE_USER = `${USERS}`,
  GET_All_USERS = `${USERS}`,
  CHANGE_PASSWORD = `${USERS}/change-password`;
