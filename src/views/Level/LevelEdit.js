import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Form } from "./components";
import SimpleToolbar from "../../components/Toolbar/SimpleToolbar";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getAllLevels, updateOneLevel } from "../../redux/slices/levels";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  },
}));

const LevelEdit = (props) => {
  const dispatch = useDispatch();
  const { Link, pageLink, title, ...rest } = props;
  const classes = useStyles();
  useEffect(() => {
    dispatch(getAllLevels(""));
  }, [dispatch]);
  return (
    <div className={classes.root}>
      <SimpleToolbar
        Link={Link}
        pageLink={"/contents/levels"}
        title={"Levels"}
      />
      <div className={classes.content}>
        <Form edit={true} />
      </div>
    </div>
  );
};

LevelEdit.propTypes = {
  user: PropTypes.object,
};

export default LevelEdit;
