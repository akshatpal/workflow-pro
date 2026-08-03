import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type { User } from "./auth.types";

interface AuthState {
  accessToken: string | null;

  user: User | null;

  isAuthenticated: boolean;

  initialized: boolean;
}

const initialState: AuthState = {
  accessToken: null,

  user: null,

  isAuthenticated: false,

  initialized: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setCredentials(
      state,
      action: PayloadAction<{
        accessToken: string;

        user: User;
      }>
    ) {
      state.accessToken =
        action.payload.accessToken;

      state.user =
        action.payload.user;

      state.isAuthenticated = true;

      state.initialized = true;
    },

    setUser(
      state,
      action: PayloadAction<User>
    ) {
      state.user =
        action.payload;

      state.isAuthenticated = true;

      state.initialized = true;
    },

    finishInitialization(
      state
    ) {
      state.initialized = true;
    },

    logout(state) {
      state.accessToken = null;

      state.user = null;

      state.isAuthenticated = false;

      state.initialized = true;
    },
  },
});

export const {
  setCredentials,
  logout,
  setUser,
  finishInitialization,
} = authSlice.actions;

export default authSlice.reducer;