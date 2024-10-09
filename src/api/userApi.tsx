import axios from 'axios';
import {
  CHANGE_PASSWORD,
  DELETE_USER,
  GET_All_USERS,
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  UPDATE_USER,
} from './endPoints';
import { User } from '../types';

// Register a new user
export const registerUser = async (userData: {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post(REGISTER_USER, userData);
  return response.data;
};

// Login user
export const loginUser = async (loginData: {
  email: string;
  password: string;
}) => {
  const response = await axios.post(LOGIN_USER, loginData);
  return response.data;
};

// Logout user
export const logoutUser = async () => {
  const response = await axios.post(LOGOUT_USER);
  return response.data;
};

/* 
    Protected routes
*/
// Update user
export const updateUserDetails = async (
  token: string,
  id: string,
  userDetails: User,
) => {
  const response = await axios.put(`${UPDATE_USER}/${id}`, userDetails, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Delete user
export const deleteUser = async (token: string, id: string) => {
  const response = await axios.delete(`${DELETE_USER}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Get all users
export const getAllUsers = async (token: string) => {
  const response = await axios.get(`${GET_All_USERS}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const changePassword = async (
  token: string,
  id: string,
  oldPassword: string,
  newPassword: string,
) => {
  const response = await axios.put(
    `${CHANGE_PASSWORD}/${id}`,
    { oldPassword, newPassword },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
