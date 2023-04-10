import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: localStorage.getItem('user') || false,
};

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state) => {
      state.user = true;
    },
    setLogout: (state) => {
      state.user = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setLogout } = userSlice.actions;

export default userSlice.reducer;
