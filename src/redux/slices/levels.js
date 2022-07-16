import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getData,
  deleteOne,
  createOne,
  getOne,
  updateOne,
  updateOrder,
} from "../../services/api";

export const getAllLevels = createAsyncThunk(
  "levels/getLevels",
  async (filter, { getState, rejectWithValue }) => {
    try {
      const { data } = await getData("levels", filter);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
//get grouped levels
export const getGroupedLevels = createAsyncThunk(
  "levels/getGroupedLevels",
  async (filter, { getState, rejectWithValue }) => {
    try {
      const { data } = await getData("levels", filter);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
// delete level
export const deleteOneLevel = createAsyncThunk(
  "course/deletLanguage",
  async (id, { rejectWithValue }) => {
    try {
      await deleteOne("levels", id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
// get one level
export const getOneLevel = createAsyncThunk(
  "level/getOneLevel",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await getOne("levels", id);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
// insert level
export const insertLevel = createAsyncThunk(
  "level/insertLevel",
  async (level, { rejectWithValue, thunkAPI }) => {
    try {
      const { data } = await createOne("levels", level);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

// update level
export const updateOneLevel = createAsyncThunk(
  "level/updateLevel",
  async (data, { rejectWithValue, thunkAPI }) => {
    const { id, ...levels } = data;
    try {
      const { data } = await updateOne("levels", id, levels);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
//update level orders
export const updateLevelOrder = createAsyncThunk(
  "level/updateLevelOrder",
  async (orders, { rejectWithValue, thunkAPI }) => {
    try {
      const { data } = await updateOrder({ orders }, "levels");
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
const initialState = {
  levels: [],
  levelsGrouped: [],
  level: [],
  error: null,
  loading: "",
  createLoading: "",
  isUpdateOrder: "",
};

const levelsSlice = createSlice({
  name: "levels",
  initialState,
  reducers: {},
  extraReducers: {
    // get levels
    [getAllLevels.pending]: (state, { payload }) => {
      state.loading = "loading";
    },
    [getAllLevels.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      state.levels = payload.payload.levels;
    },
    [getAllLevels.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
    },
    // get Grouped levels
    [getGroupedLevels.pending]: (state, { payload }) => {
      state.loading = "loading";
    },
    [getGroupedLevels.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      state.levelsGrouped = payload.payload.levels;
    },
    [getGroupedLevels.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
    },
    //get one level
    [getOneLevel.pending]: (state, { payload }) => {
      state.loading = "loading";
    },
    [getOneLevel.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      state.level = payload.payload.level;
    },
    [getOneLevel.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
    },

    //update levels orders

    [updateLevelOrder.fulfilled]: (state, { payload }) => {
      state.isUpdateOrder = "success";
    },
    [updateLevelOrder.rejected]: (state, { payload }) => {
      state.error = payload;
      state.isUpdateOrder = "failed";
    },
    //insert level
    [insertLevel.pending]: (state, { payload }) => {
      state.loading = "loading";
      state.createLoading = "loading";
    },
    [insertLevel.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      state.levels.push(payload.payload.level);
      state.createLoading = "success";
    },
    [insertLevel.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
      state.createLoading = "failed";
    },
    // delete language
    [deleteOneLevel.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      const levels = state.levels.filter((el) => el._id !== payload);
      state.levels = levels;
    },
    [deleteOneLevel.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
    },
  },
});

// export const { checkOrder } = levelsSlice.actions;
export default levelsSlice.reducer;
