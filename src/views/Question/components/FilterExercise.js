import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../../redux/slices/courses";
import { getAllLanguages } from "../../../redux/slices/languages";
import { getAllLevels } from "../../../redux/slices/levels";
import { getAllLessons } from "../../../redux/slices/lessons";
import { getAllExercices } from "../../../redux/slices/exercices";
import { getAllExercicesTypes } from "../../../redux/slices/exercicesTypes";

const FilterExercise = (props) => {
  const dispatch = useDispatch();
  const { languages } = useSelector((state) => state.languages);
  const { courses } = useSelector((state) => state.courses);
  const { levels } = useSelector((state) => state.levels);
  const { lessons } = useSelector((state) => state.lessons);
  const { exercices } = useSelector((state) => state.exercices);
  const { exerciceTypes } = useSelector((state) => state.exercicesTypes);

  //get languages
  useEffect(() => {
    if (languages.length === 0) dispatch(getAllLanguages(""));
  }, [dispatch]);

  useEffect(() => {
    if (courses.length === 0) dispatch(getAllCourses(""));
  }, [dispatch]);

  useEffect(() => {
    if (levels.length === 0) dispatch(getAllLevels(""));
  }, [dispatch]);

  useEffect(() => {
    if (lessons.length === 0) dispatch(getAllLessons(""));
  }, [dispatch]);
  useEffect(() => {
    if (exerciceTypes.length === 0) dispatch(getAllExercicesTypes(""));
  }, [dispatch]);

  return (
    <>
      {/* //language */}
      <Grid item md={3} xs={12}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="language">Language</InputLabel>
          <Select
            labelId="language"
            id="language"
            name="langId"
            label="Language"
            defaultValue=""
            onChange={(e) => {
              dispatch(getAllCourses(`?languageId=${e.target.value}`));
            }}
          >
            {languages.map((el, index) => (
              <MenuItem key={index} value={el._id}>
                {el.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* //course */}
      <Grid item md={3} xs={12}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="course">Course</InputLabel>
          <Select
            labelId="course"
            id="course"
            name="course"
            label="Course"
            defaultValue=""
            onChange={(e) => {
              dispatch(getAllLevels(`?courseId=${e.target.value}`));
              dispatch(getAllCourses(""));
            }}
          >
            {courses.map((el, index) => (
              <MenuItem key={index} value={el._id}>
                {el.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* //level */}
      <Grid item md={3} xs={12}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="level">Level</InputLabel>
          <Select
            labelId="level"
            id="level"
            name="LevId"
            label="Level"
            defaultValue=""
            onChange={(e) => {
              dispatch(getAllLessons(`?levelId=${e.target.value}`));
              dispatch(getAllLevels(""));
            }}
          >
            {levels.map((el, index) => (
              <MenuItem key={index} value={el._id}>
                {el.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* //lesson */}
      <Grid item md={3} xs={12}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="lesson">Lesson</InputLabel>
          <Select
            labelId="lesson"
            id="lesson"
            name="lessId"
            defaultValue=""
            label="Lesson"
            onChange={(e) => {
              dispatch(getAllExercices(`?lessonId=${e.target.value}`));
              dispatch(getAllLessons(""));
            }}
          >
            {lessons.map((el, index) => (
              <MenuItem key={index} value={el._id}>
                {el.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* //exercicetype */}
      <Grid item md={3} xs={12}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="exerciceType">Exercise Type</InputLabel>
          <Select
            labelId="exerciceType"
            id="exerciceType"
            label="exercise Type"
            defaultValue=""
            onChange={(e) => {
              dispatch(getAllExercices(`?exerciceTypeId=${e.target.value}`));
              dispatch(getAllExercices(""));
            }}
          >
            {exerciceTypes?.map((el, index) => (
              <MenuItem key={index} value={el._id}>
                {el.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </>
  );
};

export default FilterExercise;
