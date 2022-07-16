import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getData,
  getOne,
  createOne,
  deleteOne,
  updateOne,
  updateOrder,
} from "../../services/api";

export const getAllQuestions = createAsyncThunk(
  "questions/getQuestions",
  async (filter, { getState, rejectWithValue }) => {
    try {
      const { data } = await getData("questions", filter);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
//get grouped questions
export const getGroupedQuestions = createAsyncThunk(
  "questions/getGroupedQuestions",
  async (filter, { getState, rejectWithValue }) => {
    try {
      const { data } = await getData("questions", filter);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
//update questions orders
export const updateQuestionsOrder = createAsyncThunk(
  "level/updateQuestionOrder",
  async (orders, { rejectWithValue, thunkAPI }) => {
    try {
      const { data } = await updateOrder({ orders }, "questions");
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
export const insertQuestion = createAsyncThunk(
  "course/insertQuestion",
  async (question, { rejectWithValue }) => {
    try {
      const { data } = await createOne("questions", question);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
// update question
export const updateOneQuestion = createAsyncThunk(
  "question/updateQuestion",
  async (data, { rejectWithValue, thunkAPI }) => {
    const { id, ...question } = data;
    try {
      const { data } = await updateOne("questions", id, question);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
// delete question
export const deleteOneQuestion = createAsyncThunk(
  "question/deleteQuestion",
  async (id, { rejectWithValue }) => {
    try {
      await deleteOne("questions", id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
// get one question
export const getOneQuestion = createAsyncThunk(
  "question/getOneQuestion",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await getOne("questions", id);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
const initialState = {
  questions: [],
  groupedQuestions: [],
  question: {},
  loading: "",
};

const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    deleteQtnBlock: (state, action) => {
      const { id } = action.payload;
      const newQtnbBlocks = state.question.questionBlocks.filter(
        (el) => el._id !== id
      );
      state.question.questionBlocks = newQtnbBlocks;
    },
  },
  extraReducers: {
    // get questions
    [getAllQuestions.pending]: (state, { payload }) => {
      state.loading = "loading";
    },
    [getAllQuestions.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      state.questions = payload.payload.questions;
      state.isSuccess = true;
    },
    [getAllQuestions.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
      state.isSuccess = false;
    },
    // get Grouped questions
    [getGroupedQuestions.pending]: (state, { payload }) => {
      state.loading = "loading";
    },
    [getGroupedQuestions.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      state.groupedQuestions = payload.payload.questions;
    },
    [getGroupedQuestions.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
    },
    // get question
    [getOneQuestion.pending]: (state, { payload }) => {
      state.loading = "loading";
    },
    [getOneQuestion.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      state.question = payload.payload.question;
    },
    [getOneQuestion.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
    },
    // insert question
    [insertQuestion.pending]: (state, { payload }) => {
      state.loading = "loading";
    },
    [insertQuestion.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      state.questions.push(payload.payload.question);
    },
    [insertQuestion.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
    },
    // delete question
    [deleteOneQuestion.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      const questions = state.questions.filter((el) => el._id !== payload);
      state.questions = questions;
    },
    [deleteOneQuestion.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
    },
  },
});

export const deleteQtnBlock = (id) => (dispatch) => {
  dispatch(questionSlice.actions.deleteQtnBlock({ id }));
};

export default questionSlice.reducer;
