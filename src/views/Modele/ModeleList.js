import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Toolbar from "../../components/Toolbar/Toolbar";
import Table from "../../components/Table/Table";
import Collapse from "@material-ui/core/Collapse";
import Columns from "../../components/Columns";
import Filter from "../../components/Filter/Filter";
import { getAllModeles } from "../../redux/slices/modele";
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
    type: "modeleSwitch",
  },

  {
    accessor: "refArticle",
    name: "refArticle",
    label: "ref article",
    width: "20%",
    show: true,
    sortable: true,
  },
  {
    accessor: "client.label",
    label: "client",
    width: "20%",
    show: true,
    type: "fieldValue",
  },
  {
    accessor: "saison.label",
    label: "saison",
    width: "20%",
    show: true,
    type: "fieldValue",
  },
  {
    accessor: "famille.label",
    label: "famille",
    width: "20%",
    show: true,
    type: "fieldValue",
  },
  {
    accessor: "phase.label",
    label: "phase",
    width: "20%",
    show: true,
    type: "fieldValue",
  },
  {
    accessor: "ligneProduit.label",
    label: "ligne prdouit",
    width: "20%",
    show: true,
    type: "fieldValue",
  },
  {
    accessor: "colorCode",
    label: "color",
    width: "20%",
    show: true,
    type: "fieldValue",
  },

  {
    accessor: "deliveryDate",
    name: "deliveryDate",
    label: "Delivery Date",
    width: "20%",
    show: true,
    sortable: true,
    type: "da te",
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
  { name: "refArticle", label: "Ref Article", type: "text" },
  { name: "client ", label: "client", type: "text" },
  { name: "saison ", label: "saison", type: "text" },
  { name: "famille ", label: "famille", type: "text" },
  { name: "phase ", label: "phase", type: "text" },
  { name: "ligneProduit ", label: "ligneProduit", type: "text" },
  { name: "createdAt", label: "Created At", type: "dateRange" },
  { name: "updatedAt", label: "Updated At", type: "dateRange" },
];

const ModeleList = () => {
  const { modeles, loading } = useSelector((state) => state.modeles);

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
    if (modeles?.length === 0) {
      dispatch(getAllModeles(""));
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
        pageLink={"/modeles"}
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
            handelFilter={getAllModeles}
          />
        </Collapse>
        <Table
          loading={loading}
          columns={columns}
          data={modeles}
          handleSortChange={handleSortChange}
          sort={sort}
          handlePageChange={handlePageChange}
          page={page}
          tableService={""}
          rowsPerPage={rowsPerPage}
          handleRowsPerPageChange={handleRowsPerPageChange}
          pageLink={"/modeles"}
        />
      </div>
    </div>
  );
};

export default ModeleList;
