import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/styles";
import { AppBar, Toolbar, Hidden, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import useAuth from "hooks/useAuth";
import { useStore } from "contexts/JWTAuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
  },
  flexGrow: {
    flexGrow: 1,
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
  },
}));

const Topbar = (props) => {
  const { logout } = useAuth();
  const { user, isAuthenticated } = useStore();
  const { className, onSidebarOpen, ...rest } = props;
  const theme = useTheme();
  const classes = useStyles();
  const [notifications] = useState([]);

  const logOutAdmin = () => {
    logout();
  };
  return (
    <>
      {/* {isAuthenticated && ( */}
      <AppBar {...rest} className={clsx(classes.root, className)}>
        <Toolbar>
          <RouterLink to="/">
            <h2 style={{ fontStyle: "oblique", color: "white" }}>VTL</h2>
          </RouterLink>
          <Hidden>
            <IconButton
              style={{ marginLeft: "45px" }}
              color="inherit"
              onClick={onSidebarOpen}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>

          <div className={classes.flexGrow} />
          {isAuthenticated && (
            <>
              <IconButton
                className={classes.signOutButton}
                color="inherit"
                onClick={logOutAdmin}
              >
                <ExitToAppIcon />
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>
      {/* )} */}
    </>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func,
};

export default Topbar;
