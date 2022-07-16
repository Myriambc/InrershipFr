import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOne, getData, deleteOne, updateOne } from "../../services/api";
import { serialize } from "object-to-formdata";

export const getAllQuestionBlocks = createAsyncThunk(
  "questionBlock/getQuestionBlocks",
  async (filter, { getState, rejectWithValue }) => {
    try {
      const { data } = await getData("question-blocks", filter);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const insertQuestionBlock = createAsyncThunk(
  "questionBlock/insertQuestionBlock",
  async (questionBlock, { rejectWithValue }) => {
    try {
      const { data } = await createOne(
        "question-blocks",
        serialize(questionBlock, { indices: true })
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
// update question
export const setQuestionBlock = createAsyncThunk(
  "questionBlock/updateQuestionBlock",
  async (data, { rejectWithValue, thunkAPI }) => {
    const { id, ...obj } = data;
    try {
      const { data } = await updateOne(
        "question-blocks",
        id,
        serialize(obj, { indices: true })
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
// delete question block
export const deleteQuestionblock = createAsyncThunk(
  "questionBlock/deleteQuestionBlock",
  async (id, { rejectWithValue }) => {
    try {
      await deleteOne("question-blocks", id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const initialState = {
  questionBlocks: [],
  questionBlock: {},
  loading: "",
};

const questionBlockSlice = createSlice({
  name: "questionBlocks",
  initialState,
  reducers: {},
  extraReducers: {
    // get question-blocks
    [getAllQuestionBlocks.pending]: (state, { payload }) => {
      state.loading = "loading";
    },
    [getAllQuestionBlocks.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      state.questionBlocks = payload.payload["question-blocks"];
      state.isSuccess = true;
    },
    [getAllQuestionBlocks.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
      state.isSuccess = false;
    },

    // insert question
    [insertQuestionBlock.pending]: (state, { payload }) => {
      state.loading = "loading";
    },
    [insertQuestionBlock.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      state.questionBlocks.push(payload.payload.questionBlock);
    },
    [insertQuestionBlock.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
    },
    // delete question
    [deleteQuestionblock.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      const questionBlocks = state.questionBlocks.filter(
        (el) => el._id !== payload
      );
      state.questionBlocks = questionBlocks;
    },
    [deleteQuestionblock.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
    },
  },
});

// export const {} = questionSlice.actions;
export default questionBlockSlice.reducer;
