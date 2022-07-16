import React, { useEffect, useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardActions,
  CardContent,
  TablePagination,
} from "@material-ui/core";

import Action from "../Action/Action";
import TablePaginationActions from "./TablePaginationActions";
import CustomTable from "./CustomTable";

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 1050,
    [theme.breakpoints.down("xs")]: {
      minWidth: 50,
    },
  },
  nameContainer: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  actions: {
    justifyContent: "flex-end",
  },
  hidden: {
    display: "none",
  },
}));

const Table = (props) => {
  const {
    className,
    data,
    deleteItem,
    columns,
    handleSortChange,
    sort,
    ActionDeleteMany,
    rowsPerPage,
    handleRowsPerPageChange,
    tableService,
    pageLink,
    noShow,
    noDelete,
    noEdit,
    replace,
    noAction,
    initializeData,
    offerAction,
    noPagination,
    noCheck,
    deleteUrl,
    keyValue,
    loading,
    handlePageChange,
    otherFunction,
    ...rest
  } = props;
  const classes = useStyles();
  //const [rowsPerPage, setRowsPerPage] = useState(12);

  /*const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
    initializeData(event.target.value)
  };*/

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <CustomTable
              columns={columns}
              deleteItem={deleteItem}
              otherFunction={otherFunction}
              data={data}
              sort={sort}
              handleSortChange={handleSortChange}
              ActionComponent={Action}
              tableService={tableService}
              // rowsPerPage={rowsPerPage}
              pageLink={pageLink}
              noShow={noShow}
              offerAction={offerAction}
              noDelete={noDelete}
              noEdit={noEdit}
              noAction={noAction}
              noPagination={noPagination}
              noCheck={noCheck}
              replace={replace}
              initializeData={initializeData}
              deleteUrl={deleteUrl}
              keyValue={keyValue}
              loading={loading}
              onChangePage={handlePageChange}
            />
          </div>
        </PerfectScrollbar>
      </CardContent>
      {/* {!noPagination && (
        <CardActions className={classes.actions}>
          <TablePagination
            component="div"
            count={10}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardActions>
      )} */}
    </Card>
  );
};

Table.propTypes = {
  className: PropTypes.string,
  columns: PropTypes.array,
  handleSortChange: PropTypes.func,
  sort: PropTypes.object,
  handlePageChange: PropTypes.func,
  page: PropTypes.number,
  deleteUrl: PropTypes.string,
  delete: PropTypes.func,
};

export default Table;
