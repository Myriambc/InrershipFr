import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData, createOne, deleteOne, updateOne } from "../../services/api";
import { serialize } from "object-to-formdata";

// get all courses
export const getAllCourses = createAsyncThunk(
  "courses/getCourses",
  async (filter, { getState, rejectWithValue }) => {
    try {
      const { data } = await getData("courses", filter);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
//insert course
export const insertCourse = createAsyncThunk(
  "course/insertCourse",
  async (courseData, { rejectWithValue }) => {
    try {
      const { data } = await createOne("courses", courseData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

// update course
export const updateOneCourse = createAsyncThunk(
  "course/updateCourse",
  async (data, { rejectWithValue, thunkAPI }) => {
    const { id, ...course } = data;
    try {
      const { data } = await updateOne(
        "courses",
        id,
        serialize(course, { indices: true })
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
// delete courses
export const deleteOneCourse = createAsyncThunk(
  "course/deletecourse",
  async (id, { rejectWithValue }) => {
    try {
      await deleteOne("courses", id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const initialState = {
  courses: [],
  isCreated: "",
  error: null,
  loading: "",
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllCourses.pending]: (state, { payload }) => {
      state.loading = "loading";
    },
    [getAllCourses.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      state.courses = payload.payload.courses;
    },
    [getAllCourses.rejected]: (state, { payload }) => {
      state.error = payload;
      state.isCreated = "failed";
    },
    // insert courses
    [insertCourse.pending]: (state, { payload }) => {
      state.loading = "loading";
    },
    [insertCourse.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      state.courses.push(payload.payload.course);
      state.isCreated = "success";
    },
    [insertCourse.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
    },
    // delete courses
    [deleteOneCourse.fulfilled]: (state, { payload }) => {
      state.loading = "success";
      const courses = state.courses.filter((el) => el._id !== payload);
      state.courses = courses;
    },
    [deleteOneCourse.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = "failed";
    },
  },
});

// export const {} = coursesSlice.actions;
export default coursesSlice.reducer;
