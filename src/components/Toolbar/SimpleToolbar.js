import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { ArrowBack } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {},
  row: {
    height: "42px",
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
  },
  heading: {
    fontWeight: "400",
    marginLeft: theme.spacing(2),
  },
}));

const SimpleToolbar = (props) => {
  const { className, pageLink, title, ...rest } = props;

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.row}>
        {pageLink && (
          <IconButton aria-label="delete" component={Link} to={pageLink}>
            <ArrowBack fontSize="inherit" />
          </IconButton>
        )}
        <Typography variant="h2" component="h2" className={classes.heading}>
          {title}
        </Typography>
      </div>
    </div>
  );
};

SimpleToolbar.propTypes = {
  className: PropTypes.string,
};

export default SimpleToolbar;
