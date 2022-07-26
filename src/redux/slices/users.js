import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createOne,
  deleteOne,
  getData,
  getOne,
  updateOne,
} from "../../services/api";

export const getAllUsers = createAsyncThunk(
  "users/getUsers",
  async (filter, { getState, rejectWithValue }) => {
    try {
      const { data } = await getData("users", filter);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
// update user
export const updateOneUser = createAsyncThunk(
  "user/updateUser",
  async (data, { rejectWithValue, thunkAPI }) => {
    const { id, ...user } = data;
    try {
      const { data } = await updateOne("users", id, user);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async (id, { getState, rejectWithValue }) => {
    try {
      const { data } = await getOne("users", id);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const insertUser = createAsyncThunk(
  "user/insertUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await createOne("users", userData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

// delete user
export const deleteOneUser = createAsyncThunk(
  "users/deletUser",
  async (id, { rejectWithValue }) => {
    try {
      await deleteOne("users", id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
const initialState = {
  users: [],
  user: {},
  isSuccess: false,
  error: null,
  loading: "",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllUsers.pending]: (state, { payload }) => {
      state.loading = "loading";
    },
    [getAllUsers.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      state.users = payload.payload;
      state.isSuccess = true;
    },
    [getAllUsers.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
      state.isSuccess = false;
    },

    [getUser.pending]: (state, { payload }) => {
      state.loading = "loading";
    },
    [getUser.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      state.user = payload.payload.user;
      state.isSuccess = true;
    },
    [getUser.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
      state.isSuccess = false;
    },
    [insertUser.pending]: (state, { payload }) => {
      state.loading = "loading";
    },
    [insertUser.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      state.users.push(payload.payload);
      state.isCreated = "success";
    },
    [insertUser.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
    },

    // delete users
    [deleteOneUser.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      const users = state.users.filter((el) => el._id != payload);
      state.users = users;
    },
    [deleteOneUser.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
    },
  },
});

export const { log } = usersSlice.actions;
export default usersSlice.reducer;
