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
import { useParams } from "react-router-dom";
import SnackBar from "../../../components/SnackBar";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  insertExerciceType,
  getAllExercicesTypes,
  updateOneExerciceType,
} from "../../../redux/slices/exercicesTypes";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
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
  const { className, edit, ...rest } = props;

  const classes = useStyles();

  const [message, setAlertMessage] = useState("All fields are required");
  const [severity, setAlertSeverity] = useState("error");
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const { exerciceTypes } = useSelector((state) => state.exercicesTypes);
  useEffect(() => {
    if (exerciceTypes?.length === 0) {
      dispatch(getAllExercicesTypes(""));
    }
  }, [dispatch]);

  const exerciceType = exerciceTypes.find((el) => el._id === id);

  //validations
  const validationOnCreate = Yup.object().shape({
    title: Yup.string().required("Required"),
    intro: Yup.string()
      .min(10, "Too Short!")
      .required("Required"),
  });
  const validationOnUpdate = Yup.object().shape({
    title: Yup.string(),
    intro: Yup.string(),
  });
  //submit form
  function onSubmit(values, { setSubmitting }) {
    if (id) {
      //UPDATE
      const validValues = validateObj(exerciceType, values);
      if (Object.keys(validValues).length > 0) {
        dispatch(updateOneExerciceType({ id, ...validValues })).then(() => {
          dispatch(getAllExercicesTypes(""));
          history.push("/contents/Exercises-types");
        });
        setAlertMessage("Exercise type Updated Successfully");
        setAlertSeverity("success");
      } else {
        setAlertMessage("Nothing To Update");
        setAlertSeverity("error");
      }
    } else {
      //CREATE
      dispatch(insertExerciceType(values)).then(() => {
        dispatch(getAllExercicesTypes(""));
        history.push("/contents/Exercises-types");
      });
      setAlertMessage("Exercise type Created Successfully");
      setAlertSeverity("success");
    }
  }
  return (
    <div>
      <Card {...rest} className={clsx(classes.root, className)}>
        <Formik
          initialValues={{
            title: id ? exerciceType?.title : "",
            intro: id ? exerciceType?.intro : "",
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
              <CardHeader subheader="Exercise Type form" />
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={6} sm={6} xs={12}>
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

                  <Grid item md={6} sm={6} xs={12}>
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
                  {id ? "Update Exercise type" : "Add Exercise type"}
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
