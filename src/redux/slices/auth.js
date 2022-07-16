import { createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

// Slice
const slice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    user: [],
    isLoggedin: false,
    errors: null,
  },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = true;
      state.errors = null;
    },
    setErrors: (state, action) => {
      state.errors = action.payload.data;
      state.isLoading = false;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.data;
      state.isLoggedin = true;
      state.isLoading = false;
    },
  },
});
export default slice.reducer;
// Actions
const { loginSuccess, logoutSuccess, setIsLoading, setErrors } = slice.actions;

export const login = (data) => async (dispatch) => {
  dispatch(setIsLoading());
  try {
    const res = await api.post("/auth/login_check", data);
    dispatch(loginSuccess(res));
    window.location = "/";
  } catch (e) {
    dispatch(setErrors(e));
    return console.log(e.message);
  }
};
