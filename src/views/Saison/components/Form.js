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
  insertSaison,
  updateOneSaison,
  getAllSaisons,
} from "../../../redux/slices/saison";
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
  let history = useHistory();

  const { saisons } = useSelector((state) => state.saisons);
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
    if (saisons.length === 0) dispatch(getAllSaisons(""));
  }, [dispatch]);

  const handleClose = () => {
    setOpen(false);
  };

  const saison = saisons.find((el) => el._id === id);

  //validations
  const validationOnCreate = Yup.object().shape({
    label: Yup.string().required("Required"),
  });
  const validationOnUpdate = Yup.object().shape({
    label: Yup.string().min(3, "Too Short!"),
  });
  //submit form
  function onSubmit(values, { setSubmitting }) {
    //CREATE
    if (!id) {
      dispatch(insertSaison(values)).then(() => {
        // dispatch(getAllSaisons(""));
        history.push("/contents/saisons");
      });
      setAlertMessage("Saison Created Successfully");
      setAlertSeverity("success");
    } else {
      //UPDATE
      const validValues = validateObj(saison, values);
      if (Object.keys(validValues).length === 0) {
        setAlertMessage("Nothing To Update");
        setAlertSeverity("error");
        return;
      } else {
        dispatch(updateOneSaison({ id, ...validValues })).then(() => {
          dispatch(getAllSaisons(""));
          history.push("/contents/saisons");
        });
        setAlertMessage("Saison Updated Successfully");
        setAlertSeverity("success");
      }
    }
  }
  return (
    <div>
      <Card {...rest} className={clsx(classes.root, className)}>
        <Formik
          initialValues={{
            label: id ? saison?.label : "",
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
              <CardHeader subheader="Saison Form" />
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item sm={6} md={4} xs={12}>
                    <TextField
                      fullWidth
                      error={Boolean(touched.title && errors.title)}
                      helperText={touched.title && errors.title}
                      name="label"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.label}
                      variant="outlined"
                      label="label"
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
                  {id ? "Update Saison" : "Add Saison"}
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
