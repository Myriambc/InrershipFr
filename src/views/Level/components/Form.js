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
import { useDispatch, useSelector } from "react-redux";
import {
  insertLevel,
  getAllLevels,
  updateOneLevel,
  getGroupedLevels,
} from "../../../redux/slices/levels";
import { useHistory } from "react-router-dom";
import validateObj from "helpers/validateObj";
import { getAllCourses } from "../../../redux/slices/courses";

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
  const { id } = useParams();

  const { courses } = useSelector((state) => state.courses);
  const { levels } = useSelector((state) => state.levels);
  const level = levels.find((level) => level._id === id);
  const { className, edit, ...rest } = props;
  const classes = useStyles();

  const [message, setAlertMessage] = useState("All inputs are required");
  const [severity, setAlertSeverity] = useState("error");
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (courses.length === 0) dispatch(getAllCourses(""));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllLevels(""));
  }, [dispatch]);

  //validations
  const validationOnCreate = Yup.object().shape({
    title: Yup.string().required("Required"),
    courseId: Yup.string().required("Required"),
  });
  const validationOnUpdate = Yup.object().shape({
    title: Yup.string(),
    courseId: Yup.string(),
  });
  //submit forms
  function onSubmit(values, { setStatus, setSubmitting }) {
    //CREATE
    if (!id) {
      dispatch(insertLevel(values)).then(() => {
        dispatch(getAllLevels(""));
        dispatch(getGroupedLevels("?grouped=true&sort=-order,title"));
        history.push("/contents/Levels");
      });
      setAlertMessage("Level Created Successfully");
      setAlertSeverity("success");
      return;
    } else {
      //UPDATE
      const validValues = validateObj(level, values);
      if (Object.keys(validValues).length === 0) {
        setAlertMessage("Nothing To Update");
        setAlertSeverity("error");
        return;
      } else {
        dispatch(updateOneLevel({ id, ...validValues })).then(() => {
          dispatch(getAllLevels(""));
          dispatch(getGroupedLevels("?grouped=true&sort=-order,title"));
          history.push("/contents/Levels");
        });
        setAlertMessage("Level Updated Successfully");
        setAlertSeverity("success");
      }
    }
  }

  return (
    <div>
      <Card {...rest} className={clsx(classes.root, className)}>
        <Formik
          initialValues={{
            title: id ? level?.title : "",
            courseId: id ? level?.courseId._id : "",
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
              <CardHeader subheader="Level Form" />
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
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
                  <Grid item md={6} xs={12}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="language">Course</InputLabel>
                      <Select
                        error={Boolean(touched.courseId && errors.courseId)}
                        helperText={touched.courseId && errors.courseId}
                        labelId="course"
                        id="course"
                        name="courseId"
                        value={values.courseId}
                        label="course"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        {courses.map((el) => (
                          <MenuItem key={el._id} value={el._id}>
                            {el.title}
                          </MenuItem>
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
                  onClick={() => {
                    handleClick();
                  }}
                >
                  {!id ? "Add Level" : "Update Level"}
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
