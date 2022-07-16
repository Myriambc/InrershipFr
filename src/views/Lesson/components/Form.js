// @flow
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@material-ui/core";
import clsx from "clsx";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import { useParams } from "react-router-dom";
import SnackBar from "../../../components/SnackBar";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  insertLesson,
  updateOneLesson,
  getAllLessons,
  getGroupedLessons,
} from "../../../redux/slices/lessons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import isExist from "helpers/isExist";
import validateObj from "helpers/validateObj";
import { serialize } from "object-to-formdata";
import { getAllLevels } from "../../../redux/slices/levels";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  content: {
    padding: 0,
  },
}));

const Form = (props) => {
  const dispatch = useDispatch();
  let history = useHistory();

  const { lessons } = useSelector((state) => state.lessons);
  const { levels } = useSelector((state) => state.levels);
  const { id } = useParams();

  const { className, edit, ...rest } = props;

  const classes = useStyles();

  const [message, setAlertMessage] = useState("All fields are required");
  const [severity, setAlertSeverity] = useState("error");
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  //useEffect for the reload page
  useEffect(() => {
    if (levels.length === 0) dispatch(getAllLevels(""));
  }, [dispatch]);

  useEffect(() => {
    if (lessons.length === 0) dispatch(getAllLessons(""));
  }, [dispatch]);

  const handleClose = () => {
    setOpen(false);
  };

  const lesson = lessons.find((el) => el._id === id);

  //validations
  const validationOnCreate = Yup.object().shape({
    title: Yup.string().required("Required"),
    levelId: Yup.string().required("Required"),
    subtitle: Yup.string().required("Required"),
    intro: Yup.string().required("Required"),
    time: Yup.number().required("Required"),
    thumbnail: Yup.string().required("Required"),
  });
  const validationOnUpdate = Yup.object().shape({
    title: Yup.string().min(3, "Too Short!"),
    levelId: Yup.string(),
    subtitle: Yup.string(),
    intro: Yup.string(),
    time: Yup.number(),
    thumbnail: Yup.string(),
  });
  //submit form
  function onSubmit(values, { setSubmitting }) {
    //CREATE
    if (!id) {
      dispatch(insertLesson(serialize(values, { indices: true }))).then(() => {
        dispatch(getAllLessons(""));
        dispatch(getGroupedLessons("?grouped=true&sort=-order,title"));
        history.push("/contents/lessons");
      });
      setAlertMessage("Lesson Created Successfully");
      setAlertSeverity("success");
    } else {
      //UPDATE
      const validValues = validateObj(lesson, values);
      if (Object.keys(validValues).length === 0) {
        setAlertMessage("Nothing To Update");
        setAlertSeverity("error");
        return;
      } else {
        dispatch(updateOneLesson({ id, ...validValues })).then(() => {
          dispatch(getAllLessons(""));
          dispatch(getGroupedLessons("?grouped=true&sort=-order,title"));
          history.push("/contents/lessons");
        });
        setAlertMessage("Lesson Updated Successfully");
        setAlertSeverity("success");
      }
    }
  }
  return (
    <div>
      <Card {...rest} className={clsx(classes.root, className)}>
        <Formik
          initialValues={{
            title: id ? lesson?.title : "",
            levelId: id ? lesson?.levelId?._id : "",
            thumbnail: "",
            subtitle: id ? lesson?.subtitle : "",
            intro: id ? lesson?.intro : "",
            time: id ? lesson?.time : "",
          }}
          validationSchema={id ? validationOnUpdate : validationOnCreate}
          onSubmit={onSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            isSubmitting,
          }) => (
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <CardHeader subheader="Lesson Form" />
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item sm={6} md={4} xs={12}>
                    <TextField
                      fullWidth
                      error={Boolean(touched.title && errors.title)}
                      helperText={touched.title && errors.title}
                      name="title"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.title}
                      variant="outlined"
                      label="title"
                    />
                  </Grid>
                  <Grid item sm={6} md={4} xs={12}>
                    <TextField
                      fullWidth
                      error={Boolean(touched.subtitle && errors.subtitle)}
                      helperText={touched.subtitle && errors.subtitle}
                      name="subtitle"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.subtitle}
                      variant="outlined"
                      label="subtitle"
                    />
                  </Grid>
                  <Grid item sm={6} md={4} xs={12}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="language">Level</InputLabel>

                      <Select
                        error={Boolean(touched.levelId && errors.levelId)}
                        helperText={touched.levelId && errors.levelId}
                        labelId="level"
                        id="level"
                        name="levelId"
                        value={values.levelId}
                        label="level"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        {levels.map((el) => (
                          <MenuItem value={el._id}>{el.title}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={4} sm={6} xs={12}>
                    <TextField
                      fullWidth
                      error={Boolean(touched.intro && errors.intro)}
                      helperText={touched.intro && errors.intro}
                      name="intro"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.intro}
                      variant="outlined"
                      label="intro"
                    />
                  </Grid>
                  <Grid item md={4} sm={6} xs={12}>
                    <TextField
                      fullWidth
                      error={Boolean(touched.time && errors.time)}
                      helperText={touched.time && errors.time}
                      name="time"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.time}
                      variant="outlined"
                      label="time"
                    />
                  </Grid>
                  <Grid item md={4} sm={6} xs={12}>
                    <TextField
                      fullWidth
                      error={Boolean(touched.thumbnail && errors.thumbnail)}
                      helperText={touched.thumbnail && errors.thumbnail}
                      name="thumbnail"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        setFieldValue("thumbnail", e.target.files[0]);
                      }}
                      type="file"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <CardActions>
                <Button
                  color="primary"
                  type="submit"
                  variant="contained"
                  onClick={() => {
                    handleClick();
                  }}
                >
                  {id ? "Update Lesson" : "Add Lesson"}
                </Button>
              </CardActions>
            </form>
          )}
        </Formik>
      </Card>

      <SnackBar
        open={open}
        message={message}
        severity={severity}
        handleClose={handleClose}
      />
    </div>
  );
};

Form.propTypes = {
  className: PropTypes.string,
  edit: PropTypes.bool,
  handleCloseLoading: PropTypes.func,
  loading: PropTypes.bool,
};

export default Form;
