import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Toolbar from "../../components/Toolbar/Toolbar";
import Table from "../../components/Table/Table";
import Collapse from "@material-ui/core/Collapse";
import Columns from "../../components/Columns";
import Filter from "../../components/Filter/Filter";
import {
  getAllLevels,
  deleteOneLevel,
  getGroupedLevels,
} from "../../redux/slices/levels";
import { getAllCourses } from "../../redux/slices/courses";
import { useDispatch, useSelector } from "react-redux";
import { getAllLessons } from "../../redux/slices/lessons";
import { getAllExercices } from "../../redux/slices/exercices";
import { getAllQuestions } from "../../redux/slices/questions";

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
    width: "25%",
    show: true,
    sortable: false,
  },
  { accessor: "title", label: "Name", width: "25%", show: true },
  {
    accessor: "courseId.title",
    name: "course",
    label: "Course",
    width: "25%",
    show: true,
    sortable: false,
  },
  {
    accessor: "order",
    name: "order",
    label: "Order",
    width: "25%",
    show: true,
    sortable: false,
  },
];
const fieldSearchable = ["name"];

const LevelList = () => {
  const { levels, loading } = useSelector((state) => state.levels);
  const { courses } = useSelector((state) => state.courses);

  const fieldFilterable = [
    { name: "title", label: "title", type: "text" },
    { name: "order", label: "order", type: "number" },
    {
      name: "courseId",
      label: "course",
      type: "dropdown",
      options: courses,
    },
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
    if (levels?.length === 0) {
      dispatch(getAllLevels(""));
    }
  }, [dispatch]);
  // get courses for filter type select(dropdown)
  useEffect(() => {
    dispatch(getAllCourses(""));
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
  const dispatchOnDelete = () => {
    dispatch(getAllLessons(""));
    dispatch(getAllExercices(""));
    dispatch(getAllQuestions(""));
    dispatch(getGroupedLevels("?grouped=true&sort=-order,title"));
  };
  return (
    <div className={classes.root}>
      <Toolbar
        toggleFilters={toggleFilters}
        toggleColumns={toggleColumns}
        searchChange={searchChange}
        pageLink={"/contents/levels"}
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
            handelFilter={getAllLevels}
          />
        </Collapse>
        <Table
          deleteItem={deleteOneLevel}
          loading={loading}
          columns={columns}
          data={levels}
          handleSortChange={handleSortChange}
          sort={sort}
          handlePageChange={handlePageChange}
          page={page}
          tableService={""}
          rowsPerPage={rowsPerPage}
          handleRowsPerPageChange={handleRowsPerPageChange}
          pageLink={"/contents/levels"}
          otherFunction={dispatchOnDelete}
        />
      </div>
    </div>
  );
};

export default LevelList;
