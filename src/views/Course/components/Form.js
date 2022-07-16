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
  insertCourse,
  updateOneCourse,
  getAllCourses,
} from "../../../redux/slices/courses";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllLanguages } from "../../../redux/slices/languages";
import validateObj from "helpers/validateObj";
import { serialize } from "object-to-formdata";

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
  const classes = useStyles();

  const { id } = useParams();
  const { className, edit, ...rest } = props;
  const { languages } = useSelector((state) => state.languages);
  const { courses } = useSelector((state) => state.courses);
  const [message, setAlertMessage] = useState("All fields are required");
  const [severity, setAlertSeverity] = useState("error");
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //get the languages for the select field
  useEffect(() => {
    if (languages.length === 0) dispatch(getAllLanguages(""));
  }, [dispatch]);
  const course = courses.find((c) => c._id === id);

  //validations
  const validationOnCreate = Yup.object().shape({
    title: Yup.string()
      .min(3, "Too Short!")
      .required("Required"),
    languageId: Yup.string().required("Required"),
    shortDescription: Yup.string()
      .min(10, "Too Short!")
      .required("Required"),
    // image: Yup.any().required("Required"),
  });
  const validationOnupdate = Yup.object().shape({
    title: Yup.string().min(3, "Too Short!"),
    languageId: Yup.string(),
    shortDescription: Yup.string().min(10, "Too Short!"),
  });

  //submit form
  function onSubmit(values, { setSubmitting }) {
    if (id === undefined) {
      //CREATE

      dispatch(insertCourse(serialize(values, { indices: true }))).then(() => {
        dispatch(getAllCourses(""));
        history.push("/contents/courses");
      });
      setAlertMessage("Course Created successfully");
      setAlertSeverity("success");
    } else {
      //UPDATE
      const validValues = validateObj(course, values);
      if (Object.keys(validValues).length !== 0) {
        dispatch(updateOneCourse({ id, ...validValues })).then(() => {
          dispatch(getAllCourses(""));
          history.push("/contents/courses");
        });
        setAlertMessage("Course Updated successfully");
        setAlertSeverity("success");
      } else {
        setAlertMessage("Nothing to update");
        setAlertSeverity("error");
      }
    }
  }
  return (
    <div>
      <Card {...rest} className={clsx(classes.root, className)}>
        <Formik
          initialValues={{
            title: id ? course?.title : "",
            languageId: id ? course?.languageId?._id : "",
            shortDescription: id ? course?.shortDescription : "",
            image: "",
          }}
          validationSchema={id ? validationOnupdate : validationOnCreate}
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
            setFieldValue,
          }) => (
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <CardHeader subheader="Course Form" />
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={3} sm={6} xs={12}>
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

                  <Grid item md={3} sm={6} xs={12}>
                    <TextField
                      fullWidth
                      error={Boolean(
                        touched.shortDescription && errors.shortDescription
                      )}
                      helperText={
                        touched.shortDescription && errors.shortDescription
                      }
                      name="shortDescription"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.shortDescription}
                      variant="outlined"
                      label="description"
                    />
                  </Grid>
                  <Grid item md={3} sm={6} xs={12}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="language">Language</InputLabel>
                      <Select
                        error={Boolean(touched.languageId && errors.languageId)}
                        helperText={touched.languageId && errors.languageId}
                        labelId="language"
                        id="language"
                        name="languageId"
                        value={values.languageId}
                        label="language"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        {languages.map((el) => (
                          <MenuItem value={el._id}>{el.title}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={3} sm={6} xs={12}>
                    <TextField
                      fullWidth
                      error={Boolean(touched.image && errors.image)}
                      helperText={touched.image && errors.image}
                      name="image"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        setFieldValue("image", e.target.files[0]);
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
                  {id ? "Update Course" : "Add Course"}
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
