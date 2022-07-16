import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Toolbar from "../../components/Toolbar/Toolbar";
import Table from "../../components/Table/Table";
import Collapse from "@material-ui/core/Collapse";
import Columns from "../../components/Columns";
import Filter from "../../components/Filter/Filter";
import { deleteOneCourse, getAllCourses } from "../../redux/slices/courses";
import { getAllLanguages } from "../../redux/slices/languages";
import { useDispatch, useSelector } from "react-redux";
import { getAllLevels } from "../../redux/slices/levels";
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
    width: "20%",
    show: true,
    sortable: false,
  },
  { accessor: "title", label: "Title", width: "20%", show: true },
  {
    accessor: "languageId.title",
    label: "Language",
    width: "20%",
    show: true,
  },
  {
    accessor: "createdAt",
    name: "createdAt",
    label: "Created At",
    width: "20%",
    show: true,
    sortable: false,
    type: "date",
  },
  {
    accessor: "updatedAt",
    name: "updatedAt",
    label: "Updated At",
    width: "20%",
    show: true,
    sortable: false,
    type: "date",
  },
];
const fieldSearchable = ["id"];

const CourseList = () => {
  const { courses, loading } = useSelector((state) => state.courses);
  const { languages } = useSelector((state) => state.languages);
  const fieldFilterable = [
    { name: "title", label: "title", type: "text" },
    {
      name: "languageId",
      label: "language",
      type: "dropdown",
      options: languages,
    },
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
    if (courses.length === 0) {
      dispatch(getAllCourses(""));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllLanguages(""));
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
    dispatch(getAllLevels(""));
    dispatch(getAllLessons(""));
    dispatch(getAllExercices(""));
    dispatch(getAllQuestions(""));
  };
  return (
    <div className={classes.root}>
      <Toolbar
        toggleFilters={toggleFilters}
        toggleColumns={toggleColumns}
        searchChange={searchChange}
        pageLink={"/contents/courses"}
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
            handelFilter={getAllCourses}
          />
        </Collapse>
        <Table
          // getAll={getAllCourses}
          deleteItem={deleteOneCourse}
          loading={loading}
          columns={columns}
          data={courses}
          handleSortChange={handleSortChange}
          sort={sort}
          handlePageChange={handlePageChange}
          page={page}
          tableService={""}
          rowsPerPage={rowsPerPage}
          handleRowsPerPageChange={handleRowsPerPageChange}
          pageLink={"/contents/courses"}
          otherFunction={dispatchOnDelete}
        />
      </div>
    </div>
  );
};

export default CourseList;
