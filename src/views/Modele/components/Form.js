// @flow
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import clsx from "clsx";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory, useParams } from "react-router-dom";
import Tab from "@material-ui/core/Tab";
import TabPanel from "@material-ui/lab/TabPanel";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import SnackBar from "../../../components/SnackBar";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getAllModeles, insertModele } from "redux/slices/modele";
import e from "cors";
import { getAllClients } from "redux/slices/client";
import { getAllSaisons } from "redux/slices/saison";
import { getAllPhases } from "redux/slices/phase";
import { getAllLigneProduits } from "redux/slices/ligneProduit";
import { getAllFamilles } from "redux/slices/famille";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  },
  content: {
    padding: 0,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("xs")]: {
      minWidth: "10px",
    },
  },
}));

const Form = (props) => {
  const { id } = useParams();
  const { modeles } = useSelector((state) => state.modeles);
  const modele = modeles.find((modele) => modele._id === id);
  const { className, edit, ...rest } = props;
  const classes = useStyles();

  const [message, setAlertMessage] = useState("");
  const [severity, setAlertSeverity] = useState("");
  const [tab, setTab] = useState(1);

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function onSubmit(values) {
    values.deliveryDate = new Date(values.deliveryDate);
    //CREATE
    if (!id) {
      dispatch(insertModele(values)).then(() => {
        dispatch(getAllModeles(""));
        history.push("/contents/modeles");
      });
      setAlertMessage("modele Created Successfully");
      setAlertSeverity("success");
    } else {
      //UPDATE
      // const validValues = validateObj(lesson, values);
      // if (Object.keys(validValues).length === 0) {
      //   setAlertMessage("Nothing To Update");
      //   setAlertSeverity("error");
      //   return;
      // } else {
      //   dispatch(updateOneLesson({ id, ...validValues })).then(() => {
      //     dispatch(getAllLessons(""));
      //     dispatch(getGroupedLessons("?grouped=true&sort=-order,title"));
      //     history.push("/contents/lessons");
      //   });
      //   setAlertMessage("Lesson Updated Successfully");
      //   setAlertSeverity("success");
      // }
    }
  }
  const { clients } = useSelector((state) => state.clients);
  useEffect(() => {
    if (clients?.length === 0) {
      dispatch(getAllClients(""));
    }
  }, [dispatch]);
  const { saisons } = useSelector((state) => state.saisons);
  useEffect(() => {
    if (saisons?.length === 0) {
      dispatch(getAllSaisons(""));
    }
  }, [dispatch]);
  const { phases } = useSelector((state) => state.phases);
  useEffect(() => {
    if (phases?.length === 0) {
      dispatch(getAllPhases(""));
    }
  }, [dispatch]);
  const { ligneProduits } = useSelector((state) => state.ligneProduits);
  useEffect(() => {
    if (ligneProduits?.length === 0) {
      dispatch(getAllLigneProduits(""));
    }
  }, [dispatch]);
  const { familles } = useSelector((state) => state.familles);
  useEffect(() => {
    if (familles?.length === 0) {
      dispatch(getAllFamilles(""));
    }
  }, [dispatch]);
  const formik = useFormik({
    initialValues: {
      refArticle: id ? modele?.refArticle : "",
      client: id ? modele?.client._id : "",
      saison: id ? modele?.saison._id : "",
      famille: id ? modele?.famille._id : "",
      phase: id ? modele?.phase._id : "",
      ligneProduit: id ? modele?.ligneProduit._id : "",
      colorCode: id ? modele?.colorCode : "",
      deliveryDate: id ? modele?.deliveryDate : new Date(),
    },
    validationSchema: !id
      ? Yup.object().shape({
          refArticle: Yup.string().required(),
          client: Yup.string().required(),
          saison: Yup.string().required(),
          famille: Yup.string().required(),
          phase: Yup.string().required(),
          ligneProduit: Yup.string().required(),
          colorCode: Yup.string().required(),
          deliveryDate: Yup.date(),
        })
      : "",
    onSubmit: (values) => onSubmit(values),
  });

  return (
    <div>
      <Card {...rest} className={clsx(classes.root, className)}>
        <TabContext value={tab}>
          <div className={classes.header}>
            <TabList
              scrollButtons="auto"
              variant="scrollable"
              className={classes.header}
              onChange={handleChangeTab}
              aria-label="simple tabs example"
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="Basics" value={1} />
            </TabList>
          </div>
          <TabPanel value={1}>
            <form
              autoComplete="off"
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit(formik.values);
              }}
            >
              <CardHeader subheader="The information can be edited" />
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={3} xs={12}>
                    <TextField
                      error={Boolean(
                        formik.touched.refArticle && formik.errors.refArticle
                      )}
                      helperText={
                        formik.touched.refArticle && formik.errors.refArticle
                      }
                      fullWidth
                      autoComplete="tr"
                      label="ref article"
                      name="refArticle"
                      variant="outlined"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.refArticle}
                    />
                  </Grid>

                  <Grid item md={3} xs={12}>
                    <TextField
                      error={Boolean(
                        formik.touched.colorCode && formik.errors.colorCode
                      )}
                      helperText={
                        formik.touched.colorCode && formik.errors.colorCode
                      }
                      fullWidth
                      label="color code"
                      name="colorCode"
                      variant="outlined"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.colorCode}
                    />
                  </Grid>

                  <Grid item md={2} xs={10}>
                    <FormControl>
                      <InputLabel id="client">Client</InputLabel>
                      <Select
                        error={Boolean(
                          formik.touched.client && formik.errors.client
                        )}
                        helperText={
                          formik.touched.client && formik.errors.client
                        }
                        labelId="client"
                        id="client"
                        name="client"
                        value={formik.values.client}
                        label="Client"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        {clients.map((el) => (
                          <MenuItem value={el._id}>{el.label}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item md={2} xs={10}>
                    <FormControl>
                      <InputLabel id="role">Saison</InputLabel>
                      <Select
                        error={Boolean(
                          formik.touched.saison && formik.errors.saison
                        )}
                        helperText={
                          formik.touched.saison && formik.errors.saison
                        }
                        labelId="saison"
                        id="saison"
                        name="saison"
                        value={formik.values.saison}
                        label="Saison"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        {saisons.map((el) => (
                          <MenuItem value={el._id}>{el.label}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item md={2} xs={10}>
                    <FormControl>
                      <InputLabel id="phase">phase</InputLabel>
                      <Select
                        error={Boolean(
                          formik.touched.phase && formik.errors.phase
                        )}
                        helperText={formik.touched.phase && formik.errors.phase}
                        labelId="phase"
                        id="phase"
                        name="phase"
                        value={formik.values.phase}
                        label="phase"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        {phases.map((el) => (
                          <MenuItem value={el._id}>{el.label}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={3} xs={10}>
                    <FormControl>
                      <InputLabel id="ligneProduit">ligneProduit</InputLabel>
                      <Select
                        error={Boolean(
                          formik.touched.ligneProduit &&
                            formik.errors.ligneProduit
                        )}
                        helperText={
                          formik.touched.ligneProduit &&
                          formik.errors.ligneProduit
                        }
                        labelId="ligneProduit"
                        id="ligneProduit"
                        name="ligneProduit"
                        value={formik.values.ligneProduit}
                        label="Role"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        {ligneProduits.map((el) => (
                          <MenuItem value={el._id}>{el.label}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={3} xs={10}>
                    <FormControl>
                      <InputLabel id="famille">famille</InputLabel>
                      <Select
                        error={Boolean(
                          formik.touched.famille && formik.errors.famille
                        )}
                        helperText={
                          formik.touched.famille && formik.errors.famille
                        }
                        labelId="famille"
                        id="famille"
                        name="famille"
                        value={formik.values.famille}
                        label="Famille"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        {familles.map((el) => (
                          <MenuItem value={el._id}>{el.label}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={3} xs={10}>
                    <FormControl>
                      <InputLabel id="deliveryDate">Delivery Date</InputLabel>
                      <input
                        type="date"
                        error={Boolean(
                          formik.touched.deliveryDate &&
                            formik.errors.deliveryDate
                        )}
                        helperText={
                          formik.touched.deliveryDate &&
                          formik.errors.deliveryDate
                        }
                        labelId="deliveryDate"
                        id="deliveryDate"
                        name="deliveryDate"
                        value={formik.values.deliveryDate}
                        label="DeliveryDate"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <CardActions>
                <Button color="primary" variant="contained" type="submit">
                  Save details
                </Button>
              </CardActions>
            </form>
          </TabPanel>
        </TabContext>
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
  handleCloseLoading: PropTypes.func,
};

export default Form;
