import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/styles";
import { useMediaQuery } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import { Sidebar, Topbar, Footer } from "./components";
import ErrorBoundary from "../../components/ErrorHandler/ErrorBoundary";
import { Button } from "bootstrap";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 56,
    height: "100%",
    [theme.breakpoints.up("lg")]: {
      paddingTop: 64,
    },
  },
  shiftContent: {
    paddingLeft: 150,
  },
  content: {
    height: "100%",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: 240,
    width: `calc(100%)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

const Main = (props) => {
  const { children } = props;
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme?.breakpoints?.down("xs"), {
    defaultMatches: null,
  });
  const [openSidebar, setOpenSidebar] = useState(!isDesktop);
  const [open, setOpen] = useState(true);

  const handleSidebarOpen = () => {
    setOpenSidebar(!openSidebar);
    setOpen(false);
  };
  const handleSidebar = () => {
    setOpenSidebar(true);
    if (openSidebar) {
      setOpen(true);
    }
  };

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: openSidebar,
      })}
    >
      <Topbar
        onSidebarOpen={handleSidebarOpen}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openSidebar,
        })}
      />
      <Sidebar
        Click={handleSidebar}
        sidebar={open}
        onClose={handleSidebarOpen}
        open={openSidebar}
        variant={isDesktop ? "temporary" : "permanent"}
      />
      <main
        style={{ paddingLeft: isDesktop ? "0px" : "100px" }}
        className={classes.content}
      >
        <ErrorBoundary>{children}</ErrorBoundary>
        <Footer />
      </main>
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node,
};

export default Main;
