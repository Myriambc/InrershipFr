import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import Form from "./components/Form";
import SimpleToolbar from "../../components/Toolbar/SimpleToolbar";
import { useDispatch, useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  },
}));

const ClientCreate = (props) => {
  const dispatch = useDispatch();

  const { Link, pageLink, title, ...rest } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <SimpleToolbar
        Link={Link}
        pageLink={"/contents/clients"}
        title={"clients"}
      />
      <div className={classes.content}>
        <Form edit={true} />
      </div>
    </div>
  );
};

export default ClientCreate;
