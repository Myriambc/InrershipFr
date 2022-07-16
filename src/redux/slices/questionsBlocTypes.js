import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData } from "../../services/api";

export const getQuestionsBlocTypes = createAsyncThunk(
  "questionsTypes/getQuestionsTypes",
  async (filter, { getState, rejectWithValue }) => {
    try {
      const { data } = await getData("question-block-types", filter);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const initialState = {
  questionBlocTypes: [],
  loading: "",
};

const questionBlocTypeSlice = createSlice({
  name: "questionBlocTypes",
  initialState,
  reducers: {},
  extraReducers: {
    // get exs
    [getQuestionsBlocTypes.pending]: (state, { payload }) => {
      state.loading = "loading";
    },
    [getQuestionsBlocTypes.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      state.questionBlocTypes = payload.payload.questionBlockTypes;
      state.isSuccess = true;
    },
    [getQuestionsBlocTypes.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
      state.isSuccess = false;
    },
  },
});

export const {} = questionBlocTypeSlice.actions;
export default questionBlocTypeSlice.reducer;
