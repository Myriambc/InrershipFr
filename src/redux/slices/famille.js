import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serialize } from "object-to-formdata";
import { getData, createOne, deleteOne, updateOne } from "../../services/api";

export const getAllFamilles = createAsyncThunk(
  "familles/getFamilles",
  async (filter, { getState, rejectWithValue }) => {
    try {
      const { data } = await getData("familles", filter);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

// update famille
export const updateOneFamille = createAsyncThunk(
  "famille/updateFamille",
  async (data, { rejectWithValue, thunkAPI }) => {
    const { id, ...famille } = data;
    try {
      const { data } = await updateOne("familles", id, famille);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
// insert familles
export const insertFamille = createAsyncThunk(
  "familles/insertFamille",
  async (famille, { rejectWithValue }) => {
    try {
      const { data } = await createOne("familles", famille);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

// delete famille
export const deleteOneFamille = createAsyncThunk(
  "familles/deletFamille",
  async (id, { rejectWithValue }) => {
    try {
      await deleteOne("familles", id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const initialState = {
  familles: [],
  loading: "",
};

const famillesSlice = createSlice({
  name: "familles",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllFamilles.pending]: (state, { payload }) => {
      state.loading = "loading";
    },
    [getAllFamilles.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      state.familles = payload.payload;
    },
    [getAllFamilles.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
    },
    //insert familles
    [insertFamille.pending]: (state, { payload }) => {
      state.loading = "loading";
    },
    [insertFamille.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      state.familles.push(payload.payload);
    },
    [insertFamille.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
    },

    // delete familles
    [deleteOneFamille.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      const familles = state.familles.filter((el) => el._id != payload);
      state.familles = familles;
    },
    [deleteOneFamille.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
    },
  },
});

export default famillesSlice.reducer;
