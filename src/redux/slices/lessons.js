import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getData,
  createOne,
  deleteOne,
  updateOne,
  updateOrder,
} from "../../services/api";
import { serialize } from "object-to-formdata";

export const getAllLessons = createAsyncThunk(
  "lessons/getLessons",
  async (filter, { getState, rejectWithValue }) => {
    try {
      const { data } = await getData("lessons", filter);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
//get grouped levels
export const getGroupedLessons = createAsyncThunk(
  "lessons/getGroupedLessons",
  async (filter, { getState, rejectWithValue }) => {
    try {
      const { data } = await getData("lessons", filter);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
// update lesson
export const updateOneLesson = createAsyncThunk(
  "lesson/updateLesson",
  async (data, { rejectWithValue, thunkAPI }) => {
    const { id, ...lesson } = data;
    try {
      const { data } = await updateOne(
        "lessons",
        id,
        serialize(lesson, { indices: true })
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
// insert lessons
export const insertLesson = createAsyncThunk(
  "lessons/insertLesson",
  async (lesson, { rejectWithValue }) => {
    try {
      const { data } = await createOne("lessons", lesson);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

// delete lesson
export const deleteOneLesson = createAsyncThunk(
  "lessons/deletLesson",
  async (id, { rejectWithValue }) => {
    try {
      await deleteOne("lessons", id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
//update lesson orders
export const updateLessonOrder = createAsyncThunk(
  "level/updateLevelOrder",
  async (orders, { rejectWithValue, thunkAPI }) => {
    try {
      const { data } = await updateOrder({ orders }, "lessons");
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
const initialState = {
  lessons: [],
  lessonsGrouped: [],
  loading: "",
};

const lessonsSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllLessons.pending]: (state, { payload }) => {
      state.loading = "loading";
    },
    [getAllLessons.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      state.lessons = payload.payload.lessons;
    },
    [getAllLessons.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
    },
    // get Grouped lessons
    [getGroupedLessons.pending]: (state, { payload }) => {
      state.loading = "loading";
    },
    [getGroupedLessons.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      state.lessonsGrouped = payload.payload.lessons;
    },
    [getGroupedLessons.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
    },
    //insert lessons
    [insertLesson.pending]: (state, { payload }) => {
      state.loading = "loading";
    },
    [insertLesson.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      state.lessons.push(payload.payload.lesson);
    },
    [insertLesson.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
    },

    // delete lessons
    [deleteOneLesson.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      const lessons = state.lessons.filter((el) => el._id != payload);
      state.lessons = lessons;
    },
    [deleteOneLesson.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
    },
  },
});

export const {} = lessonsSlice.actions;
export default lessonsSlice.reducer;
