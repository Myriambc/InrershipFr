import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getData,
  createOne,
  deleteOne,
  updateOne,
  updateOrder,
} from "../../services/api";

// get exercices
export const getAllExercices = createAsyncThunk(
  "exercices/getExercices",
  async (filter, { getState, rejectWithValue }) => {
    try {
      const { data } = await getData("exercices", filter);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
//get grouped exercises
export const getGroupedExercises = createAsyncThunk(
  "exercises/getGroupedExercises",
  async (filter, { getState, rejectWithValue }) => {
    try {
      const { data } = await getData("exercices", filter);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
//create exercice
export const insertExercice = createAsyncThunk(
  "course/insertExercice",
  async (exercice, { rejectWithValue }) => {
    try {
      const { data } = await createOne("exercices", exercice);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
// update exercice
export const updateOneExercice = createAsyncThunk(
  "exercice/updateExercice",
  async (data, { rejectWithValue, thunkAPI }) => {
    const { id, ...exercice } = data;
    try {
      const { data } = await updateOne("exercices", id, exercice);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
//update exercise orders
export const updateExerciseOrder = createAsyncThunk(
  "level/updateLevelOrder",
  async (orders, { rejectWithValue, thunkAPI }) => {
    try {
      const { data } = await updateOrder({ orders }, "exercices");
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
// delete exercice
export const deleteOneExercice = createAsyncThunk(
  "exercice/deleteexercice",
  async (id, { rejectWithValue }) => {
    try {
      await deleteOne("exercices", id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const initialState = {
  exercices: [],
  groupedExercises: [],
  error: null,
  loading: "",
};

const exerciceSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: {
    // get exs
    [getAllExercices.pending]: (state, { payload }) => {
      state.loading = "loading";
    },
    [getAllExercices.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      state.exercices = payload.payload.exercices;
    },
    [getAllExercices.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
    },
    // get Grouped exercises
    [getGroupedExercises.pending]: (state, { payload }) => {
      state.loading = "loading";
    },
    [getGroupedExercises.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      state.groupedExercises = payload.payload.exercices;
    },
    [getGroupedExercises.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
    },
    // insert exercice
    [insertExercice.pending]: (state, { payload }) => {
      state.loading = "loading";
    },
    [insertExercice.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      state.exercices.push(payload.payload.exercice);
    },
    [insertExercice.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
    },
    // delete exercice
    [deleteOneExercice.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      const exercices = state.exercices.filter((el) => el._id != payload);
      state.exercices = exercices;
    },
    [deleteOneExercice.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
    },
  },
});

export const {} = exerciceSlice.actions;
export default exerciceSlice.reducer;
