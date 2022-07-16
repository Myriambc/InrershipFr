import { configureStore } from "@reduxjs/toolkit";
import api from "../services/api";
import auth from "./slices/auth";
import users from "./slices/users";
import languages from "./slices/languages";
import levels from "./slices/levels";
import courses from "./slices/courses";
import lessons from "./slices/lessons";
import exercices from "./slices/exercices";
import questions from "./slices/questions";
import exercicesTypes from "./slices/exercicesTypes";
import questionBlocTypes from "./slices/questionsBlocTypes";
import questionBlocks from "./slices/questionBlocks";

export default configureStore({
  reducer: {
    auth,
    users,
    languages,
    levels,
    courses,
    lessons,
    exercices,
    questions,
    exercicesTypes,
    questionBlocTypes,
    questionBlocks,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
      serializableCheck: false,
    }),
});
