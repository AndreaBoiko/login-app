import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/user';

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
}

const tokenFromStorage = localStorage.getItem('token');
const refreshTokenFromStorage = localStorage.getItem('refreshToken');

const getUser = () => {
  const userFromStorage = localStorage.getItem('user');

  if (userFromStorage) {
    const userObj: User = JSON.parse(userFromStorage);
    return userObj;
  } else {
    return null;
  }
};

const initialState: AuthState = {
  token: tokenFromStorage,
  refreshToken: refreshTokenFromStorage,
  user: getUser(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<{ token: string; refreshToken: string }>) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    },
    clearTokens: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
  },
});

export const { setTokens, clearTokens, setUser } = authSlice.actions;
export default authSlice.reducer;
