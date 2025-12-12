import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserData {
  name: string;
  email: string;
  id?: string;
  profileImage?: string;
}

interface AuthState {
  userData: UserData | null;
  token: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
}

interface LoginPayload {
  userData: UserData;
  token: string;
}

interface RegisterPayload {
  userData: UserData;
}

interface UpdateProfilePayload {
  name?: string;
  profileImage?: string;
}

const initialState: AuthState = {
  userData: null,
  token: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    registerSuccess: (state, action: PayloadAction<RegisterPayload>) => {
      state.userData = action.payload.userData;
      state.isLoading = false;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<LoginPayload>) => {
      state.userData = action.payload.userData;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.error = null;
    },
    logout: state => {
      // Keep userData but clear token and login state
      state.token = null;
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = null;
    },
    updateProfile: (state, action: PayloadAction<UpdateProfilePayload>) => {
      if (state.userData) {
        if (action.payload.name) {
          state.userData.name = action.payload.name;
        }
        if (action.payload.profileImage) {
          state.userData.profileImage = action.payload.profileImage;
        }
      }
    },
    clearError: state => {
      state.error = null;
    },
    // Handle rehydration from redux-persist
    rehydrateComplete: state => {
      state.isLoading = false;
    },
  },
});

export const {
  setLoading,
  setError,
  registerSuccess,
  loginSuccess,
  logout,
  updateProfile,
  clearError,
  rehydrateComplete,
} = authSlice.actions;

export default authSlice.reducer;
