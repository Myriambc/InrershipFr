import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData, createOne, deleteOne, updateOne } from "../../services/api";
import { serialize } from "object-to-formdata";

export const getAllSaisons = createAsyncThunk(
  "saisons/getSaisons",
  async (filter, { getState, rejectWithValue }) => {
    try {
      const { data } = await getData("saisons", filter);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

// update saison
export const updateOneSaison = createAsyncThunk(
  "saison/updateSaison",
  async (data, { rejectWithValue, thunkAPI }) => {
    const { id, ...saison } = data;
    try {
      const { data } = await updateOne("saisons", id, saison);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
// insert saisons
export const insertSaison = createAsyncThunk(
  "saisons/insertSaison",
  async (saison, { rejectWithValue }) => {
    try {
      const { data } = await createOne("saisons", saison);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

// delete saison
export const deleteOneSaison = createAsyncThunk(
  "saisons/deletSaison",
  async (id, { rejectWithValue }) => {
    try {
      await deleteOne("saisons", id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const initialState = {
  saisons: [],
  loading: "",
};

const saisonsSlice = createSlice({
  name: "saisons",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllSaisons.pending]: (state, { payload }) => {
      state.loading = "loading";
    },
    [getAllSaisons.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      state.saisons = payload.payload;
    },
    [getAllSaisons.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
    },
    //insert saisons
    [insertSaison.pending]: (state, { payload }) => {
      state.loading = "loading";
    },
    [insertSaison.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      state.saisons.push(payload.payload);
    },
    [insertSaison.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
    },

    // delete saisons
    [deleteOneSaison.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      const saisons = state.saisons.filter((el) => el._id != payload);
      state.saisons = saisons;
    },
    [deleteOneSaison.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
    },
  },
});

export default saisonsSlice.reducer;
