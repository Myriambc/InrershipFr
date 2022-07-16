import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TableContainer,
  IconButton,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

import TableSortLabel from "@material-ui/core/TableSortLabel";
import Chip from "@material-ui/core/Chip";
import moment from "moment";
import List from "@material-ui/core/List";

import ListItem from "@material-ui/core/ListItem";
import Label from "../Label";

import VisibilityIcon from "@material-ui/icons/Visibility";
import Tooltip from "@material-ui/core/Tooltip";
import { MenuBook } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
    zIndex: 0,
  },
  inner: {
    minWidth: 1050,
  },
  nameContainer: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  orange: {
    color: "red",
    //backgroundColor: deepOrange[500],
  },
  purple: {
    color: "green",
    //backgroundColor: deepPurple[500],
  },
  actions: {
    justifyContent: "flex-end",
  },
  hidden: {
    display: "none",
  },
  listItem: {
    padding: 0,
  },
  customTableContainer: {
    overflowX: "initial",
  },
  CardButtonDelete: {
    background: "white",
    fontWeight: "bold",
    fontFamily: theme.typography.fontFamily,
    fontSize: "14px",
    paddingBottom: "0px",
  },
}));

const CustomTable = (props) => {
  const classes = useStyles();
  const {
    data,
    deleteItem,
    otherFunction,
    columns,
    sort,
    handleSortChange,
    ActionComponent,
    tableService,
    pageLink,
    initializeData,
    rowsPerPage,
    noShow,
    noDelete,
    noEdit,
    noAction,
    offerAction,
    noPagination,
    noCheck,
    replace,
    loading,
    // deleteUrl,
    // keyValue,
  } = props;
  const [selected, setSelected] = useState([]);

  const handleSelectAll = (event) => {
    let selected;

    if (event.target.checked) {
      selected = data?.payload?.map((row) => row.id);
    } else {
      selected = [];
    }

    setSelected(selected);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selected?.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected?.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected?.slice(1));
    } else if (selectedIndex === selected?.length - 1) {
      newSelected = newSelected?.concat(selected?.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected?.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const accessor = (obj, is, value) => {
    if (typeof is == "string") {
      if (is.includes("[")) {
        return accessor(obj, is.split("[")[0], value);
      }
      return accessor(obj, is.split("."), value);
    } else if (is.length === 1 && value !== undefined) {
      return (obj[is[0]] = value);
    } else if (is.length === 0) {
      return obj;
    } else {
      if (obj[is[0]]) {
        return accessor(obj[is[0]], is.slice(1), value);
      }
      return "NA";
    }
  };

  const chipType = (col, value) => {
    return (
      <Chip
        size="small"
        color={value === "Yes" ? "secondary" : "primary"}
        label={value}
      />
    );
  };

  const booleanType = (col, value) => {
    const v = Number(value) ? "Yes" : "No";
    return chipType(col, v);
  };

  const dateType = (col, value) => {
    const v = moment(value).isValid()
      ? moment(value)
          .format("DD/MM/YYYY")
          .toString()
      : "* * * * *";
    return chipType(col, v);
  };
  const dateTimeType = (col, value) => {
    const v = moment(value).isValid()
      ? moment(value, "YYYY/MM/DD HH:mm")
          .format("DD/MM/YYYY HH:mm")
          .toString()
      : "* * * * *";
    return chipType(col, v);
  };
  const simpleListType = (col, value) => {
    return (
      <List>
        {value?.map((v) => (
          <ListItem key={v.id}>
            <Chip
              size="small"
              color="secondary"
              //value without column name
              label={typeof v === "string" ? v : v[col.field]}
            />
          </ListItem>
        ))}
      </List>
    );
  };

  const pointsType = (col, value) => {
    if (value === 0 || value === "NA") {
      return (
        <Chip
          label={0}
          style={{ backgroundColor: "goldenrod", color: "white" }}
        />
      );
    }
    if (0 < value && value <= 100) {
      return (
        <Chip
          label={value}
          style={{ backgroundColor: "lightseagreen", color: "white" }}
        />
      );
    }
    if (100 < value && value <= 1000) {
      return (
        <Chip
          label={value}
          style={{ backgroundColor: "blueviolet", color: "white" }}
        />
      );
    }
    if (value > 1000) {
      return (
        <Chip
          label={value}
          style={{ backgroundColor: "pink", color: "white" }}
        />
      );
    }
  };

  const concatString = (col, value) => {
    return (
      <Typography color="textSecondary">
        <Tooltip title="Switch">
          <a
            target="_blank"
            style={{
              color: "royalblue",
              textDecoration: "none",
              cursor: "pointer",
            }}
            onClick={(event) => switchStudent(event, value?.id)}
          >
            {value.name} {value.last_name}{" "}
          </a>
        </Tooltip>
        <Label>Id: {value.id || "---"}</Label>
      </Typography>
    );
  };
  const switchStudent = (event, id) => {};

  const subjectType = (col, value) => {
    return (
      <Tooltip
        title={
          <List>
            {value.length <= 0 ? (
              <label> </label>
            ) : (
              value.map((v) => (
                <ListItem key={v.id}>
                  <div style={{ fontSize: "13px", fontWeight: "bold" }}>
                    {v?.chapter
                      ? v.chapter.subject?.division?.name +
                        " | " +
                        v.chapter.subject?.name
                      : v?.subject
                      ? v.subject?.division?.name + " | " + v.subject?.name
                      : "----"}
                  </div>
                </ListItem>
              ))
            )}
          </List>
        }
        style={{ color: "black" }}
      >
        <IconButton>
          <MenuBook />
        </IconButton>
      </Tooltip>
    );
  };

  const fieldValue = (col, value) => {
    return value !== null && value !== "NA" ? value : " ";
  };

  const renderType = (item, col) => {
    const value = accessor(item, col.accessor);

    switch (col.type) {
      case "chip":
        return chipType(col, value);
      case "boolean":
        return booleanType(col, value);
      case "date":
        return dateType(col, value);
      case "dateTime":
        return dateTimeType(col, value);
      case "simpleList":
        return simpleListType(col, value);
      case "concatString":
        return concatString(col, value);
        return fieldValue(col, value);
      case "pointsType":
        return pointsType(col, value);
      case "subjectType":
        return subjectType(col, value);
      default:
        return value;
    }
  };

  return (
    <div>
      <div
        style={{ position: "relative", zIndex: "0" }}
        className={classes.root}
      >
        <TableContainer style={{ maxHeight: "700px" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {!noCheck && (
                  <TableCell padding="checkbox">
                    {/* <Checkbox
                      checked={selected?.length === data?.length}
                      color="primary"
                      indeterminate={
                        selected?.length > 0 && selected?.length < data?.length
                      }
                      onChange={(e) => handleSelectAll(e)}
                    /> */}
                  </TableCell>
                )}
                {columns.map(
                  (col) =>
                    col.show && (
                      <TableCell key={col.accessor}>
                        {col.sortable ? (
                          <TableSortLabel
                            active={sort.name === col.name}
                            direction={
                              sort.name === col.name ? sort.order : "asc"
                            }
                            onClick={(e) => handleSortChange(e, col.name)}
                          >
                            {col.label}
                          </TableSortLabel>
                        ) : (
                          <span>{col.label}</span>
                        )}
                      </TableCell>
                    )
                )}
                {!noAction && ActionComponent && <TableCell>Action</TableCell>}
              </TableRow>
            </TableHead>
            {loading == "loading" && (
              <Box>
                <CircularProgress />
              </Box>
            )}
            {loading === "success" && (
              <TableBody>
                <>
                  {data?.map((item, index) => (
                    <TableRow hover key={index}>
                      {!noCheck && (
                        <TableCell padding="checkbox">
                          <Checkbox
                            // checked={selected.indexOf(item.id) !== -1}
                            color="primary"
                            onChange={(event) =>
                              handleSelectOne(event, item._id)
                            }
                            value="true"
                          />
                        </TableCell>
                      )}

                      {columns.map(
                        (col) =>
                          col.show && (
                            <TableCell
                              key={`${col.accessor}-${item.id}`}
                              style={{ width: col.width }}
                            >
                              {Array.isArray(renderType(item, col))
                                ? renderType(item, col)
                                    .map((el) => el?.label)
                                    .join(" | ")
                                : renderType(item, col)}
                            </TableCell>
                          )
                      )}
                      {!noAction && ActionComponent && (
                        <TableCell style={{ width: "6%" }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            {/* {pageLink == "/users/students" && (
                              <VisibilityIcon
                                style={{ cursor: "pointer" }}
                                onClick={(event) =>
                                  switchStudent(event, item?.id)
                                }
                              />
                            )} */}

                            <ActionComponent
                              deleteItem={deleteItem}
                              otherFunction={otherFunction}
                              itemId={item._id}
                              tableService={tableService}
                              pageLink={pageLink}
                              noShow={noShow}
                              noDelete={noDelete}
                              noPagination={noPagination}
                              noCheck={noCheck}
                              replace={replace}
                              noEdit={noEdit}
                              offerAction={offerAction}
                              initializeData={initializeData}
                              rowsPerPage={rowsPerPage}
                            />
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </div>
      <div></div>
    </div>
  );
};

CustomTable.propTypes = {
  data: PropTypes.object,
  columns: PropTypes.array,
  sort: PropTypes.object,
  handleSortChange: PropTypes.func,
  ActionComponent: PropTypes.elementType,
};

export default CustomTable;
