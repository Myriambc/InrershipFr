import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData, createOne, deleteOne, updateOne } from "../../services/api";
import { serialize } from "object-to-formdata";

export const getAllPhases = createAsyncThunk(
  "phases/getPhases",
  async (filter, { getState, rejectWithValue }) => {
    try {
      const { data } = await getData("phases", filter);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

// update phase
export const updateOnePhase = createAsyncThunk(
  "phase/updatePhase",
  async (data, { rejectWithValue, thunkAPI }) => {
    const { id, ...phase } = data;
    try {
      const { data } = await updateOne("phases", id, phase);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
// insert phases
export const insertPhase = createAsyncThunk(
  "phases/insertPhase",
  async (phase, { rejectWithValue }) => {
    try {
      const { data } = await createOne("phases", phase);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

// delete phase
export const deleteOnePhase = createAsyncThunk(
  "phases/deletPhase",
  async (id, { rejectWithValue }) => {
    try {
      await deleteOne("phases", id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const initialState = {
  phases: [],
  loading: "",
};

const phasesSlice = createSlice({
  name: "phases",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllPhases.pending]: (state, { payload }) => {
      state.loading = "loading";
    },
    [getAllPhases.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      state.phases = payload.payload;
    },
    [getAllPhases.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
    },
    //insert phases
    [insertPhase.pending]: (state, { payload }) => {
      state.loading = "loading";
    },
    [insertPhase.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      state.phases.push(payload.payload);
    },
    [insertPhase.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
    },

    // delete phases
    [deleteOnePhase.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      const phases = state.phases.filter((el) => el._id != payload);
      state.phases = phases;
    },
    [deleteOnePhase.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
    },
  },
});

export default phasesSlice.reducer;
