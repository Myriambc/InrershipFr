import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Toolbar from "../../components/Toolbar/Toolbar";
import Table from "../../components/Table/Table";
import Collapse from "@material-ui/core/Collapse";
import Columns from "../../components/Columns";
import Filter from "../../components/Filter/Filter";
import { getAllUsers } from "../../redux/slices/users";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  },
}));

const columnsList = [
  {
    accessor: "_id",
    name: "id",
    label: "Id",
    width: "7%",
    show: true,
    sortable: true,
    type: "userSwitch",
  },

  {
    accessor: "name",
    name: "name",
    label: "Full name",
    width: "20%",
    show: true,
    sortable: true,
  },
  {
    accessor: "email",
    label: "email",
    width: "20%",
    show: true,
    type: "fieldValue",
  },
  {
    accessor: "roles[0].label",
    label: "role",
    width: "20%",
    show: true,
    type: "fieldValue",
  },

  {
    accessor: "createdAt",
    name: "createdAt",
    label: "Created At",
    width: "20%",
    show: true,
    sortable: true,
    type: "date",
  },
  {
    accessor: "updatedAt",
    name: "updatedAt",
    label: "Updated At",
    width: "20%",
    show: true,
    sortable: true,
    type: "date",
  },
];
const fieldFilterable = [
  { name: "name", label: "Full name", type: "text" },
  { name: "email", label: "email", type: "text" },
  { name: "createdAt", label: "Created At", type: "dateRange" },
  { name: "updatedAt", label: "Updated At", type: "dateRange" },
];

const UserList = () => {
  const { users, loading } = useSelector((state) => state.users);

  const [search, searchChange] = useState("");
  const [filters, filtersChange] = useState({});
  const [columns, columnsChange] = useState(columnsList);
  const [sort, sortChange] = useState({ accessor: "id", order: "desc" });
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [columnsOpen, setColumnsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(24);
  const [data, setData] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    if (users?.length === 0) {
      dispatch(getAllUsers(""));
    }
  }, [dispatch]);

  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
  };
  const toggleColumns = () => {
    setColumnsOpen(!columnsOpen);
  };
  const handleSortChange = (accessor) => {
    sortChange({
      accessor: accessor,
      order: sort.order === "asc" ? "desc" : "asc",
    });
  };

  const handlePageChange = (event, page) => {
    setPage(page + 1);
  };
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Toolbar
        toggleFilters={toggleFilters}
        toggleColumns={toggleColumns}
        searchChange={searchChange}
        pageLink={"/admins"}
        searchMessage={"Search (ID, Name)"}
      />
      <div className={classes.content}>
        <Collapse in={columnsOpen}>
          <Columns columnsChange={columnsChange} columns={columns} />
        </Collapse>
        <Collapse in={filtersOpen}>
          <Filter
            fields={fieldFilterable}
            values={filters}
            filtersChange={filtersChange}
            handelFilter={getAllUsers}
          />
        </Collapse>
        <Table
          loading={loading}
          columns={columns}
          data={users}
          handleSortChange={handleSortChange}
          sort={sort}
          handlePageChange={handlePageChange}
          page={page}
          tableService={""}
          rowsPerPage={rowsPerPage}
          handleRowsPerPageChange={handleRowsPerPageChange}
          pageLink={"/admins"}
        />
      </div>
    </div>
  );
};

export default UserList;
