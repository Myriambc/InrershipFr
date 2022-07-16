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
      //localStorage.setItem("user", action.payload.data.user_id);
      /*localStorage.setItem("token_type", action.payload.data.token_type);
      localStorage.setItem("token", action.payload.data.access_token);
      localStorage.setItem("expires_at", action.payload.data.expires_at);*/
      state.user = action.payload.data;
      state.isLoggedin = true;
      state.isLoading = false;
    },
    // logoutSuccess: (state, action) => {
    //   localStorage.removeItem("user");
    //   localStorage.removeItem("token");
    //   localStorage.removeItem("token_type");
    //   localStorage.removeItem("expires_at");
    //   state.user = [];
    //   state.isLoggedin = false;
    // },
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

// export const logout = () => async (dispatch) => {
//   try {
//     const res = await api.get("/auth/logout/");
//     dispatch(logoutSuccess());
//     window.location = "/login";
//   } catch (e) {
//     dispatch(logoutSuccess());
//     window.location = "/login";
//     return console.error(e.message);
//   }
// };
