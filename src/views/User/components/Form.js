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
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import clsx from "clsx";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory, useParams } from "react-router-dom";
import Tab from "@material-ui/core/Tab";
import TabPanel from "@material-ui/lab/TabPanel";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import SnackBar from "../../../components/SnackBar";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { insertUser } from "redux/slices/users";
import e from "cors";

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
  const { users } = useSelector((state) => state.users);
  const user = users.find((user) => user._id === id);
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
    //CREATE
    if (!id) {
      dispatch(insertUser(values)).then(() => {
        history.push("/admins");
      });
      setAlertMessage("admin Created Successfully");
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
  const formik = useFormik({
    initialValues: {
      name: id ? user?.name : "",
      email: id ? user?.email : "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: !id
      ? Yup.object().shape({
          name: Yup.string().required(),
          email: Yup.string().required(),
          password: Yup.string().required(),
          confirmPassword: Yup.string().required(),
          roles: Yup.string().required(),
        })
      : "",
    // onSubmit: (values) => onSubmit(values),
  });
  const DUMMY_ROLES = [
    {
      _id: "62cff7b5e057b01e97b11f2b",
      label: "supervisor",
      createdAt: "2022-07-14T11:02:13.771Z",
      updatedAt: "2022-07-14T11:02:13.771Z",
    },
    {
      _id: "62cff7bfe057b01e97b11f2d",
      label: "admin",
      createdAt: "2022-07-14T11:02:23.388Z",
      updatedAt: "2022-07-14T11:02:23.388Z",
    },
    {
      _id: "62cff7c4e057b01e97b11f2f",
      label: "worker",
      createdAt: "2022-07-14T11:02:28.255Z",
      updatedAt: "2022-07-14T11:02:28.255Z",
    },
  ];
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
                        formik.touched.fullName && formik.errors.fullName
                      )}
                      helperText={
                        formik.touched.fullName && formik.errors.fullName
                      }
                      fullWidth
                      autoComplete="tr"
                      label="Full name"
                      name="name"
                      variant="outlined"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.fullName}
                    />
                  </Grid>

                  <Grid item md={3} xs={12}>
                    <TextField
                      error={Boolean(
                        formik.touched.email && formik.errors.email
                      )}
                      helperText={formik.touched.email && formik.errors.email}
                      fullWidth
                      label="Email Address"
                      name="email"
                      variant="outlined"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <TextField
                      error={Boolean(
                        formik.touched.password && formik.errors.password
                      )}
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                      fullWidth
                      label="password"
                      name="password"
                      autoComplete="none"
                      variant="outlined"
                      type="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <TextField
                      error={Boolean(
                        formik.touched.password && formik.errors.password
                      )}
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                      fullWidth
                      label="passwordConfirm"
                      name="passwordConfirm"
                      autoComplete="none"
                      variant="outlined"
                      type="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.passwordConfirm}
                    />
                  </Grid>
                </Grid>

                <Grid item md={3} sm={6} xs={12} mt={20}>
                  <FormControl>
                    <InputLabel id="role">Role</InputLabel>
                    <Select
                      error={Boolean(
                        formik.touched.roleId && formik.errors.roleId
                      )}
                      helperText={formik.touched.roleId && formik.errors.roleId}
                      labelId="role"
                      id="role"
                      name="roles"
                      value={formik.values.roles}
                      label="Role"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      {DUMMY_ROLES.map((el) => (
                        <MenuItem value={el._id}>{el.label}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
