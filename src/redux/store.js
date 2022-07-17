import { configureStore } from "@reduxjs/toolkit";
import api from "../services/api";
import auth from "./slices/auth";
import users from "./slices/users";
import saisons from "./slices/saison";
import phases from "./slices/phase";
import familles from "./slices/famille";
import ligneProduits from "./slices/ligneProduit";

export default configureStore({
  reducer: {
    auth,
    users,
    saisons,
    phases,
    familles,
    ligneProduits,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
      serializableCheck: false,
    }),
});
