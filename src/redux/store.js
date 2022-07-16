import { configureStore } from "@reduxjs/toolkit";
import api from "../services/api";
import auth from "./slices/auth";
import users from "./slices/users";
import lessons from "./slices/lessons";

export default configureStore({
  reducer: {
    auth,
    users,
    lessons,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
      serializableCheck: false,
    }),
});
