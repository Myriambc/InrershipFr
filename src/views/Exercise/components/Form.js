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
  insertExercice,
  getAllExercices,
  updateOneExercice,
  getGroupedExercises,
} from "../../../redux/slices/exercices";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllLessons } from "../../../redux/slices/lessons";
import { getAllExercicesTypes } from "../../../redux/slices/exercicesTypes";
import validateObj from "helpers/validateObj";

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
  const history = useHistory();
  const { id } = useParams();

  const { exercices } = useSelector((state) => state.exercices);
  const { className, edit, ...rest } = props;
  const { lessons } = useSelector((state) => state.lessons);
  const { exerciceTypes } = useSelector((state) => state.exercicesTypes);
  const exercice = exercices.find((el) => el._id === id);

  const classes = useStyles();
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });
  const [message, setAlertMessage] = useState("All fields are required");
  const [severity, setAlertSeverity] = useState("error");
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  //useEffect for the reload page
  useEffect(() => {
    if (lessons.length === 0) dispatch(getAllLessons(""));
  }, [dispatch]);
  useEffect(() => {
    if (exerciceTypes.length === 0) dispatch(getAllExercicesTypes(""));
  }, [dispatch]);

  //validations
  const validationOnCreate = Yup.object().shape({
    title: Yup.string().required("Required"),
    lessonId: Yup.string().required("Required"),
    exerciceTypeId: Yup.string().required("Required"),
  });
  const validationOnUpdate = Yup.object().shape({
    title: Yup.string().min(3, "Too Short!"),
    lessonId: Yup.string(),
    exerciceTypeId: Yup.string(),
  });
  //submit function
  function onSubmit(values, { setSubmitting }) {
    if (id) {
      //UPDATE
      const validValues = validateObj(exercice, values);
      if (Object.keys(validValues).length === 0) {
        setAlertMessage("Nothing To Update");
        setAlertSeverity("error");
        return;
      } else {
        dispatch(updateOneExercice({ id, ...validValues })).then(() => {
          dispatch(getAllExercices(""));
          dispatch(getGroupedExercises("?grouped=true&sort=-order,title"));
          history.push("/contents/exercises");
        });
        setAlertMessage("Exercise Updated successfully");
        setAlertSeverity("success");
      }
    } else {
      //CREATE
      dispatch(insertExercice(values)).then(() => {
        dispatch(getAllExercices(""));
        dispatch(getGroupedExercises("?grouped=true&sort=-order,title"));
        history.push("/contents/Exercises");
      });
      setAlertMessage("Exercise Created successfully");
      setAlertSeverity("success");
    }
  }
  return (
    <div>
      <Card {...rest} className={clsx(classes.root, className)}>
        <Formik
          initialValues={{
            title: id ? exercice?.title : "",
            lessonId: id ? exercice?.lessonId?._id : "",
            exerciceTypeId: id ? exercice?.exerciceTypeId?._id : "",
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
            isSubmitting,
          }) => (
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <CardHeader subheader="Exercise form" />
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={4} sm={6} xs={12}>
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
                  <Grid item md={4} sm={6} xs={12}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="language">Lesson</InputLabel>
                      <Select
                        error={Boolean(touched.lessonId && errors.lessonId)}
                        helperText={touched.lessonId && errors.lessonId}
                        labelId="lesson"
                        id="lesson"
                        name="lessonId"
                        value={values.lessonId}
                        label="Lesson"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        {lessons.map((el) => (
                          <MenuItem value={el._id}>{el.title}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={4} sm={6} xs={12}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="exercice-type">Type</InputLabel>
                      <Select
                        error={Boolean(
                          touched.exerciceTypeId && errors.exerciceTypeId
                        )}
                        helperText={
                          touched.exerciceTypeId && errors.exerciceTypeId
                        }
                        labelId="exercice-type"
                        id="exercice-type"
                        name="exerciceTypeId"
                        value={values.exerciceTypeId}
                        label="Type"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        {exerciceTypes?.map((el) => (
                          <MenuItem value={el._id}>{el.title}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <CardActions>
                <Button
                  color="primary"
                  type="submit"
                  variant="contained"
                  onClick={() => handleClick()}
                >
                  {id ? "Update Exercise" : "Add Exercise"}
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
