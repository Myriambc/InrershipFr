import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Grid, makeStyles } from "@material-ui/core";
import BasicsInfo from "./BasicsInfo";
import LevelsInfo from "./LevelsInfo";

const useStyles = makeStyles(() => ({
  root: {},
}));

const Details = ({ user, levels, pointsHistory, className, ...rest }) => {
  const classes = useStyles();
  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      spacing={3}
      {...rest}
    >
      <Grid item lg={4} md={6} xl={4} xs={12}>
        <BasicsInfo user={user} />
      </Grid>
      {/* <Grid item lg={4} md={6} xl={4} xs={12}>
        <LevelsInfo levels={levels} />
      </Grid> */}
    </Grid>
  );
};

Details.propTypes = {
  className: PropTypes.string,
  levels: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  pointsHistory: PropTypes.object.isRequired,
};

export default Details;
