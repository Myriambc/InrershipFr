import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData, createOne, deleteOne, updateOne } from "../../services/api";
import { serialize } from "object-to-formdata";

export const getAllModeles = createAsyncThunk(
  "modeles/getModeles",
  async (filter, { getState, rejectWithValue }) => {
    try {
      const { data } = await getData("modeles", filter);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

// update modele
export const updateOneModele = createAsyncThunk(
  "modele/updateModele",
  async (data, { rejectWithValue, thunkAPI }) => {
    const { id, ...modele } = data;
    try {
      const { data } = await updateOne(
        "modeles",
        id,
        serialize(modele, { indices: true })
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
// insert modeles
export const insertModele = createAsyncThunk(
  "modeles/insertModele",
  async (modele, { rejectWithValue }) => {
    try {
      const { data } = await createOne("modeles", modele);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

// delete modele
export const deleteOneModele = createAsyncThunk(
  "modeles/deletModele",
  async (id, { rejectWithValue }) => {
    try {
      await deleteOne("modeles", id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const initialState = {
  modeles: [],
  loading: "",
};

const modelesSlice = createSlice({
  name: "modeles",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllModeles.pending]: (state, { payload }) => {
      state.loading = "loading";
    },
    [getAllModeles.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      state.modeles = payload.payload;
    },
    [getAllModeles.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
    },
    //insert modeles
    [insertModele.pending]: (state, { payload }) => {
      state.loading = "loading";
    },
    [insertModele.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      state.modeles.push(payload.payload);
    },
    [insertModele.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
    },

    // delete modeles
    [deleteOneModele.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      const modeles = state.modeles.filter((el) => el._id != payload);
      state.modeles = modeles;
    },
    [deleteOneModele.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
    },
  },
});

export default modelesSlice.reducer;
