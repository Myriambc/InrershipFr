// @flow
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
} from "@material-ui/core";
// import { Avatar, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
    overflow: "visible",
  },
  mtop: {
    marginTop: 24,
  },
  mtop0: {
    marginTop: 0,
  },
  content: {
    padding: 0,
  },
  uploadedFiles: {
    marginTop: 10,
  },
}));

const AccountDetails = (props) => {
  const { className, user, ...rest } = props;
  const classes = useStyles();
  const [values, setValues] = useState(user);

  const handleChange = (event) => {
    setValues({ [event.target.name]: event.target.value, ...values });
  };
  const handleSubmit = () => {};

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form autoComplete="off" noValidate>
        <CardHeader subheader="User information" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                type="text"
                fullWidth
                label="User Name"
                name="UserName"
                onChange={(e) => handleChange(e)}
                required
                value={values.fullName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                type="text"
                fullWidth
                label="Email Address"
                name="email"
                onChange={(e) => handleChange(e)}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            Save details
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

export default AccountDetails;
