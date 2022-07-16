import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getData,
  createOne,
  getOne,
  deleteOne,
  updateOne,
} from "../../services/api";
import { serialize } from "object-to-formdata";

export const getAllLanguages = createAsyncThunk(
  "languages/getLanguages",
  async (filter, { getState, rejectWithValue }) => {
    try {
      const { data } = await getData("languages", filter);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
// insert language
export const insertLanguage = createAsyncThunk(
  "language/insertLanguage",
  async (language, { rejectWithValue }) => {
    try {
      const { data } = await createOne("languages", language);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
// update language
export const updateOneLanguage = createAsyncThunk(
  "language/updateLanguage",
  async (data, { rejectWithValue, thunkAPI }) => {
    const { id, ...language } = data;
    try {
      const { data } = await updateOne(
        "languages",
        id,
        serialize(language, { indices: true })
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
// get one language
export const getOneLanguage = createAsyncThunk(
  "language/getOneLanguage",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await getOne("languages", id);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

// delete language
export const deleteOneLanguage = createAsyncThunk(
  "course/deletLanguage",
  async (id, { rejectWithValue }) => {
    try {
      await deleteOne("languages", id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
const initialState = {
  languages: [],
  error: null,
  loading: "",
};

const languagesSlice = createSlice({
  name: "languages",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllLanguages.pending]: (state, { payload }) => {
      state.loading = "loading";
    },
    [getAllLanguages.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      state.languages = payload.payload.languages;
    },
    [getAllLanguages.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
    },
    //insert language
    [insertLanguage.pending]: (state, { payload }) => {
      state.loading = "loading";
    },
    [insertLanguage.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      state.languages.push(payload.payload.language);
    },
    [insertLanguage.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
    },
    //get one language
    [getOneLanguage.pending]: (state, { payload }) => {
      state.loading = "loading";
    },
    [getOneLanguage.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      state.language.push(payload.language.payload);
    },
    [getOneLanguage.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
    },

    // delete language
    [deleteOneLanguage.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      const languages = state.languages.filter((el) => el._id !== payload);
      state.languages = languages;
    },
    [deleteOneLanguage.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
    },
  },
});

// export const {} = languagesSlice.actions;
export default languagesSlice.reducer;
