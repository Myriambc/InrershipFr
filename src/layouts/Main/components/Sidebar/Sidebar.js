import React, { useEffect, useState, useContext } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/styles";
import { Divider, Drawer } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import SettingsIcon from "@material-ui/icons/Settings";
import DnsIcon from "@material-ui/icons/Dns";
import Looks5Icon from "@material-ui/icons/Looks5";
import { Profile, SidebarNav } from "./components";
import Loading from "../../../../components/Loading/Loading";
import { useStore } from "../../../../contexts/JWTAuthContext";
import IconButton from "@material-ui/core/IconButton";
import ListAltIcon from "@material-ui/icons/ListAlt";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    [theme.breakpoints.up("lg")]: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
  },
  root: {
    backgroundColor: theme.palette.white,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  nav: {
    marginBottom: theme.spacing(2),
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },

  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(9) + 1,
    [theme.breakpoints.down("xs")]: {
      width: theme.spacing(9) + 5,
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Sidebar = (props) => {
  const { open, variant, onClose, className, Click, sidebar, ...rest } = props;
  const { user, isAuthenticated } = useStore();
  const theme = useTheme();
  const classes = useStyles();
  const pages = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <DashboardIcon />,
    },
    {
      title: "Admins",
      icon: <PeopleIcon />,
      children: [
        {
          title: "Admins",
          href: "/admins",
          roleName: "users_list",
        },
      ],
    },

    // {
    //   title: "Statistics",
    //   icon: <BarChartIcon />,
    //   children: [],
    // },
    {
      title: "Contents",
      icon: <FindInPageIcon />,
      children: [
        {
          title: "Languages",
          href: "/contents/languages",
        },
        {
          title: "Courses",
          href: "/contents/courses",
        },
        {
          title: "Levels",
          href: "/contents/levels",
        },
        {
          title: "Lessons",
          href: "/contents/lessons",
        },
        {
          title: "Exercises Types",
          href: "/contents/exercises-types",
        },
        {
          title: "Exercises",
          href: "/contents/exercises",
        },
        {
          title: "Questions",
          href: "/contents/questions",
        },
      ],
    },
    {
      title: "Orders",
      icon: <ListAltIcon />,
      children: [
        {
          title: "Levels",
          href: "/orders/levels",
        },
        {
          title: "Lessons",
          href: "/orders/lessons",
        },
        {
          title: "Exercises",
          href: "/orders/exercises",
        },
        {
          title: "Questions",
          href: "/orders/questions",
        },
      ],
    },

    {
      title: "Settings",
      icon: <SettingsIcon />,
      children: [
        {
          title: "Admin Users",
          href: "/settings/admin-users",
        },
        {
          title: "Admin Roles",
          href: "/settings/roles",
        },
      ],
    },
  ];
  // if (!user) {
  //   return <Loading />;
  // }

  return (
    <>
      <Drawer
        ModalProps={{ onBackdropClick: onClose }}
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        anchor="left"
        onClose={open}
        open={open}
        variant={variant}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <>
          <div {...rest} className={clsx(classes.root, className)}>
            <div className={classes.toolbar}>
              <IconButton onClick={onClose}></IconButton>
            </div>
            <Profile profil={open} />
            <Divider className={classes.divider} />
            <SidebarNav
              Click={Click}
              sidebar={open}
              className={classes.nav}
              pages={pages}
              user={user?.payload?.admin}
            />
          </div>
        </>
      </Drawer>
    </>
  );
};

Sidebar.propTypes = {
  // className: PropTypes.string,
  onClose: PropTypes.func,
  // open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
};

export default Sidebar;
