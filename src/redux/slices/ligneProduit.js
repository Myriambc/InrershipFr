import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData, createOne, deleteOne, updateOne } from "../../services/api";
import { serialize } from "object-to-formdata";

export const getAllLigneProduits = createAsyncThunk(
  "ligneProduits/getLigneProduits",
  async (filter, { getState, rejectWithValue }) => {
    try {
      const { data } = await getData("lignes-produit", filter);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

// update ligneProduit
export const updateOneLigneProduit = createAsyncThunk(
  "ligneProduit/updateLigneProduit",
  async (data, { rejectWithValue, thunkAPI }) => {
    const { id, ...ligneProduit } = data;
    try {
      const { data } = await updateOne(
        "lignes-produit",
        id,
        serialize(ligneProduit, { indices: true })
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
// insert ligneProduits
export const insertLigneProduit = createAsyncThunk(
  "ligneProduits/insertLigneProduit",
  async (ligneProduit, { rejectWithValue }) => {
    try {
      const { data } = await createOne("lignes-produit", ligneProduit);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

// delete ligneProduit
export const deleteOneLigneProduit = createAsyncThunk(
  "ligneProduits/deletLigneProduit",
  async (id, { rejectWithValue }) => {
    try {
      await deleteOne("lignes-produit", id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const initialState = {
  ligneProduits: [],
  loading: "",
};

const ligneProduitsSlice = createSlice({
  name: "ligneProduits",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllLigneProduits.pending]: (state, { payload }) => {
      state.loading = "loading";
    },
    [getAllLigneProduits.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      state.ligneProduits = payload.payload;
    },
    [getAllLigneProduits.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
    },
    //insert ligneProduits
    [insertLigneProduit.pending]: (state, { payload }) => {
      state.loading = "loading";
    },
    [insertLigneProduit.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      state.ligneProduits.push(payload.payload);
    },
    [insertLigneProduit.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
    },

    // delete ligneProduits
    [deleteOneLigneProduit.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      const ligneProduits = state.ligneProduits.filter(
        (el) => el._id != payload
      );
      state.ligneProduits = ligneProduits;
    },
    [deleteOneLigneProduit.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
    },
  },
});

export default ligneProduitsSlice.reducer;
