import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Toolbar from "../../components/Toolbar/Toolbar";
import Table from "../../components/Table/Table";
import Collapse from "@material-ui/core/Collapse";
import Columns from "../../components/Columns";
import Filter from "../../components/Filter/Filter";
import { getAllClients, deleteOneClient } from "../../redux/slices/client";
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
    width: "12,5%",
    show: true,
    sortable: false,
  },
  { accessor: "label", label: "Label", width: "20%", show: true },
  { accessor: "logo", label: "Logo", width: "20%", show: true, type: "image" },
  {
    accessor: "createdAt",
    name: "createdAt",
    label: "Created At",
    width: "14%",
    show: true,
    sortable: false,
    type: "date",
  },
  {
    accessor: "updatedAt",
    name: "updatedAt",
    label: "Updated At",
    width: "14%",
    show: true,
    sortable: false,
    type: "date",
  },
];

const fieldSearchable = ["id"];

const ClientList = () => {
  const { clients, loading } = useSelector((state) => state.clients);

  const fieldFilterable = [
    { name: "label", label: "label", type: "text" },
    { name: "createdAt", label: "Created At", type: "dateRange" },
    { name: "updatedAt", label: "Updated At", type: "dateRange" },
  ];
  const [search, searchChange] = useState("");
  const [filters, filtersChange] = useState({});
  const [columns, columnsChange] = useState(columnsList);
  const [sort, sortChange] = useState({ accessor: "id", order: "desc" });
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [columnsOpen, setColumnsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(24);
  const classes = useStyles();

  const dispatch = useDispatch();
  useEffect(() => {
    if (clients?.length === 0) {
      dispatch(getAllClients(""));
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

  return (
    <div className={classes.root}>
      <Toolbar
        toggleFilters={toggleFilters}
        toggleColumns={toggleColumns}
        searchChange={searchChange}
        pageLink={"/contents/clients"}
        searchMessage={"Search (ID )"}
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
            handelFilter={getAllClients}
          />
        </Collapse>
        <Table
          deleteItem={deleteOneClient}
          loading={loading}
          columns={columns}
          data={clients}
          handleSortChange={handleSortChange}
          sort={sort}
          handlePageChange={handlePageChange}
          page={page}
          tableService={""}
          rowsPerPage={rowsPerPage}
          handleRowsPerPageChange={handleRowsPerPageChange}
          pageLink={"/contents/clients"}
        />
      </div>
    </div>
  );
};

export default ClientList;
