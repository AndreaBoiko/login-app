import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  refreshToken: string | null;
}

const tokenFromStorage = localStorage.getItem('token');
const refreshTokenFromStorage = localStorage.getItem('refreshToken');

const initialState: AuthState = {
  token: tokenFromStorage,
  refreshToken: refreshTokenFromStorage,
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
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    },
  },
});

export const { setTokens, clearTokens } = authSlice.actions;
export default authSlice.reducer;
