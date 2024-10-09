import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../../types';

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('user') as string) ?? undefined,
  token: localStorage.getItem('token') ?? undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<AuthState>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token as string);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    logout(state) {
      state.user = undefined;
      state.token = undefined;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    setUserState: (state, action: PayloadAction<AuthState>) => {
      state.user = action.payload.user;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
  },
});

export const { logout, login, setUserState } = userSlice.actions;
export default userSlice.reducer;
