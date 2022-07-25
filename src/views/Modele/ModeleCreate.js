import React from "react";
import { makeStyles } from "@material-ui/styles";

import Form from "./components/Form";
import SimpleToolbar from "../../components/Toolbar/SimpleToolbar";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  },
}));

const UserCreate = (props) => {
  const { Link, pageLink, title, ...rest } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <SimpleToolbar
        Link={Link}
        pageLink={"/contents/modeles"}
        title={"Create Modele"}
      />
      <div className={classes.content}>
        <Form edit={false} />
      </div>
    </div>
  );
};

export default UserCreate;
