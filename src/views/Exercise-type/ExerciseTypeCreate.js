import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import Form from "./components/Form";
import SimpleToolbar from "../../components/Toolbar/SimpleToolbar";
import { useDispatch } from "react-redux";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  },
}));

const ExerciceTypeCreate = (props) => {
  const dispatch = useDispatch();
  const { Link, pageLink, title, ...rest } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <SimpleToolbar
        Link={Link}
        pageLink={"/contents/exercises-types"}
        title={"Exercise Type"}
      />
      <div className={classes.content}>
        <Form edit={false} />
      </div>
    </div>
  );
};

export default ExerciceTypeCreate;
