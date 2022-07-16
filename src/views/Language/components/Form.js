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
  insertLanguage,
  getAllLanguages,
  updateOneLanguage,
} from "../../../redux/slices/languages";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
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
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const { className, edit, ...rest } = props;
  const { languages } = useSelector((state) => state.languages);
  const language = languages.find((el) => el._id === id);
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
  //get languages from api whene reload page for expl
  useEffect(() => {
    if (languages.length === 0) dispatch(getAllLanguages(""));
  }, [dispatch]);

  //validations
  const validationOnCreate = Yup.object().shape({
    title: Yup.string()
      .matches(/^[a-z,A-Z]+$/, "Must be only caracters")
      .required("Required"),
    thumbnail: Yup.string().required("Required"),
  });
  const validationOnUpdate = Yup.object().shape({
    title: Yup.string(),
    thumbnail: Yup.string(),
  });

  //submit forms
  function onSubmit(values, { setSubmitting }) {
    if (id) {
      //UPDATE
      const validValues = validateObj(language, values);
      if (Object.keys(validValues).length > 0) {
        dispatch(updateOneLanguage({ id, ...validValues })).then(() => {
          dispatch(getAllLanguages(""));
          history.push("/contents/Languages");
        });
        setAlertMessage("Language Updated Successfully");
        setAlertSeverity("success");
      } else {
        setAlertMessage("Nothing To Update");
        setAlertSeverity("error");
      }
    } else {
      //CREATE
      dispatch(insertLanguage(serialize(values, { indices: true }))).then(
        () => {
          dispatch(getAllLanguages(""));
          history.push("/contents/Languages");
        }
      );
      setAlertMessage("Language Created Successfully");
      setAlertSeverity("success");
    }
  }

  return (
    <div>
      <Card {...rest} className={clsx(classes.root, className)}>
        <Formik
          initialValues={{
            title: id ? language?.title : "",
            thumbnail: "",
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
            setFieldValue,
          }) => (
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <CardHeader subheader="Language Form" />
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
                      value={values.image}
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
                  onClick={() => handleClick()}
                >
                  {!id ? "Add Language" : "Update Language"}
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
