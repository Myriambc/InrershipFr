import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Avatar, Typography } from "@material-ui/core";
import { setItemFromStorage } from "../../../../../../utils/Storage.js";
import { getData, getOne } from "../../../../../../services/api";
import { useStore } from "contexts/JWTAuthContext";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "fit-content",
  },
  avatar: {
    width: 60,
    height: 60,
  },
  name: {
    marginTop: theme.spacing(1),
  },
}));

const Profile = (props) => {
  const { user } = useStore();
  const { className, profil, ...rest } = props;

  const classes = useStyles();
  const [values, setValues] = useState([]);

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={user?.avatar}
        to="/account"
      />
      {profil ? (
        <Typography className={classes.name} variant="h4">
          {(user && user?.fullName) || ""}
        </Typography>
      ) : (
        <br />
      )}
      {profil ? (
        <Typography variant="body2">{(user && user.email) || ""}</Typography>
      ) : (
        <br />
      )}
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

export default Profile;
