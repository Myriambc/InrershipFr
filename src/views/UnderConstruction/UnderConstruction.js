import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  content: {
    paddingTop: 100,
    textAlign: "center",
  },
  image: {
    marginTop: 50,
    display: "inline-block",
    maxWidth: "100%",
    width: 560,
  },
}));

const UnderConstruction = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container justifyContent="center" spacing={4}>
        <Grid item lg={6} xs={12}>
          <div className={classes.content}>
            <Typography variant="h1">
              503: The page you are looking for is under construction
            </Typography>
            <Typography variant="subtitle2">
              We're still working on this page
            </Typography>
            <img
              alt="Under development"
              className={classes.image}
              src="/images/not_found.png"
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default UnderConstruction;
