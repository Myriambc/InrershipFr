import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Toolbar from "../../components/Toolbar/Toolbar";
import Table from "../../components/Table/Table";
import Collapse from "@material-ui/core/Collapse";
import Columns from "../../components/Columns";
import Filter from "../../components/Filter/Filter";
import { getAllLessons, deleteOneLesson } from "../../redux/slices/lessons";
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
  { accessor: "title", label: "Title", width: "14%", show: true },
  { accessor: "subtitle", label: "Subtitle", width: "14%", show: true },
  { accessor: "time", label: "Time", width: "14%", show: true },
  {
    accessor: "levelId.title",
    name: "level",
    label: "Level",
    width: "14%",
    show: true,
    sortable: false,
  },
  {
    accessor: "order",
    label: "Order",
    width: "14%",
    show: true,
    sortable: false,
  },

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

const LessonList = () => {
  const { lessons, loading } = useSelector((state) => state.lessons);

  const fieldFilterable = [
    { name: "title", label: "title", type: "text" },
    { name: "subtitle", label: "subtitle", type: "text" },
    { name: "order", label: "order", type: "number" },
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
    if (lessons?.length === 0) {
      dispatch(getAllLessons(""));
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
        pageLink={"/contents/lessons"}
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
            handelFilter={getAllLessons}
          />
        </Collapse>
        <Table
          deleteItem={deleteOneLesson}
          loading={loading}
          columns={columns}
          data={lessons}
          handleSortChange={handleSortChange}
          sort={sort}
          handlePageChange={handlePageChange}
          page={page}
          tableService={""}
          rowsPerPage={rowsPerPage}
          handleRowsPerPageChange={handleRowsPerPageChange}
          pageLink={"/contents/lessons"}
        />
      </div>
    </div>
  );
};

export default LessonList;
