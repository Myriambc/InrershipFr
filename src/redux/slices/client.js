import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serialize } from "object-to-formdata";
import { getData, createOne, deleteOne, updateOne } from "../../services/api";

export const getAllClients = createAsyncThunk(
  "clients/getClients",
  async (filter, { getState, rejectWithValue }) => {
    try {
      const { data } = await getData("clients", filter);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

// update client
export const updateOneClient = createAsyncThunk(
  "client/updateClient",
  async (data, { rejectWithValue, thunkAPI }) => {
    const { id, ...client } = data;
    try {
      const { data } = await updateOne(
        "clients",
        id,
        serialize(client, { indices: true })
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
// insert clients
export const insertClient = createAsyncThunk(
  "clients/insertClient",
  async (client, { rejectWithValue }) => {
    try {
      const { data } = await createOne(
        "clients",
        serialize(client, { indices: true })
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

// delete client
export const deleteOneClient = createAsyncThunk(
  "clients/deletClient",
  async (id, { rejectWithValue }) => {
    try {
      await deleteOne("clients", id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const initialState = {
  clients: [],
  loading: "",
};

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllClients.pending]: (state, { payload }) => {
      state.loading = "loading";
    },
    [getAllClients.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      state.clients = payload.payload;
    },
    [getAllClients.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
    },
    //insert clients
    [insertClient.pending]: (state, { payload }) => {
      state.loading = "loading";
    },
    [insertClient.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      state.clients.push(payload.payload);
    },
    [insertClient.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
    },

    // delete clients
    [deleteOneClient.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      const clients = state.clients.filter((el) => el._id != payload);
      state.clients = clients;
    },
    [deleteOneClient.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
    },
  },
});

export default clientsSlice.reducer;
