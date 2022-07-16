import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData, createOne, deleteOne, updateOne } from "../../services/api";
// get exercices
export const getAllExercicesTypes = createAsyncThunk(
  "exercices/getExercicesTypes",
  async (filter, { getState, rejectWithValue }) => {
    try {
      const { data } = await getData("exercice-type", filter);
      // console.log("get exercices-types", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
//create exercice
export const insertExerciceType = createAsyncThunk(
  "course/insertExerciceTypes",
  async (exerciceType, { rejectWithValue }) => {
    try {
      const { data } = await createOne("exercice-type", exerciceType);
      // console.log("create exercice-types", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
// update exerciceType
export const updateOneExerciceType = createAsyncThunk(
  "ex/updateExType",
  async (data, { rejectWithValue, thunkAPI }) => {
    const { id, ...levels } = data;
    try {
      const { data } = await updateOne("exercice-type", id, levels);
      // console.log("ex type update", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
// delete exercice
export const deleteOneExerciceType = createAsyncThunk(
  "exercice/deleteexercicetypes",
  async (id, { rejectWithValue }) => {
    try {
      await deleteOne("exercice-type", id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const initialState = {
  exerciceTypes: [],
  error: null,
  loading: "",
};

const exerciceTypeSlice = createSlice({
  name: "exerciceType",
  initialState,
  reducers: {},
  extraReducers: {
    // get exs
    [getAllExercicesTypes.pending]: (state, { payload }) => {
      state.loading = "loading";
    },
    [getAllExercicesTypes.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      state.exerciceTypes = payload.payload.exerciceTypes;
    },
    [getAllExercicesTypes.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
    },
    // insert exercice
    [insertExerciceType.pending]: (state, { payload }) => {
      state.loading = "loading";
    },
    [insertExerciceType.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      state.exerciceTypes.push(payload.payload.exerciceType);
    },
    [insertExerciceType.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
    },
    // delete exercice
    [deleteOneExerciceType.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      const exerciceType = state.exerciceTypes.filter(
        (el) => el._id !== payload
      );
      state.exerciceTypes = exerciceType;
    },
    [deleteOneExerciceType.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
    },
  },
});

// export const {} = exerciceTypeSlice.actions;
export default exerciceTypeSlice.reducer;
