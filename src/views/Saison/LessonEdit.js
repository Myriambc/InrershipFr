import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Form } from "./components";
import SimpleToolbar from "../../components/Toolbar/SimpleToolbar";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  },
}));

const LessonEdit = (props) => {
  const { Link, pageLink, title, ...rest } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <SimpleToolbar
        Link={Link}
        pageLink={"/contents/saisons"}
        title={"saisons"}
      />
      <div className={classes.content}>
        <Form edit={true} />
      </div>
    </div>
  );
};

LessonEdit.propTypes = {
  user: PropTypes.object,
};

export default LessonEdit;
