//@flow
import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/styles";
import { Button, useMediaQuery, Container, Grid } from "@material-ui/core";
import { FilterList, ViewColumn } from "@material-ui/icons";
import SearchInput from "../SearchInput/SearchInput";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { useStore } from "../../contexts/JWTAuthContext";

const useStyles = makeStyles((theme) => ({
  root: {},
  row: {
    height: "42px",
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
  },
  container: {
    height: "42px",
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      display: "block",
      paddingBottom: "120px",
    },
  },
  smallRow: {
    flexDirection: "row",
  },
  spacer: {
    display: "flex",
    justifyContent: "end",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "start",
    },
  },
  importButton: {
    marginRight: theme.spacing(1),
  },
  exportButton: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
    },
  },
  filterButton: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      marginRight: theme.spacing(-2),
      marginLeft: theme.spacing(-1),
    },
  },
  columnButton: {
    marginRight: theme.spacing(1),
  },
  searchInput: {
    marginRight: theme.spacing(1),
  },
  heading: {
    fontWeight: "400",
  },
}));

// type Props = {
//   className: string,
//   toggleColumns: Function,
//   toggleFilters: Function,
//   searchChange: Function,
//   pageLink: string,
//   handleExport: Function,
// };
const Toolbar = (props) => {
  const {
    className,
    toggleColumns,
    toggleFilters,
    searchChange,
    pageLink,
    removeAdd,
    noExport,
    handleExport,
    searchMessage,
    initializeData,
    rowsPerPage,
    title,
    cacheUrl,
    cache_method,
    ...rest
  } = props;
  const { user } = useStore();
  const route = window.location.pathname + "/create";
  const name = title
    ? title.toUpperCase()
    : pageLink.split("/")[1].toUpperCase();
  const classes = useStyles();
  const handleSearch = (e) => {
    searchChange(e.target.value);
  };
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.down("xs"), {
    defaultMatches: true,
  });
  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.row}>
        <Typography
          variant={isDesktop ? "h4" : "h2"}
          component="h2"
          className={classes.heading}
        >
          {name}
        </Typography>
      </div>
      <Grid Container className={classes.container}>
        <Grid item xs={12}>
          <SearchInput
            className={classes.searchInput}
            placeholder={searchMessage}
            onChange={handleSearch}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            color="default"
            size="large"
            className={classes.filterButton}
            onClick={toggleFilters}
            startIcon={<FilterList />}
          >
            Filter
          </Button>
          <Button
            color="default"
            size="large"
            className={classes.columnButton}
            onClick={toggleColumns}
            startIcon={<ViewColumn />}
          >
            Columns
          </Button>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.spacer}>
            <Button className={classes.exportButton} onClick={handleExport}>
              Export
            </Button>
            <Button
              color="primary"
              variant="contained"
              component={Link}
              to={`${pageLink}/create`}
            >
              Add
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
  toggleFilters: PropTypes.func,
  toggleColumns: PropTypes.func,
  searchChange: PropTypes.func,
};

export default Toolbar;
