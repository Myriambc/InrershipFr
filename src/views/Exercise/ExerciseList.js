import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Toolbar from "../../components/Toolbar/Toolbar";
import Table from "../../components/Table/Table";
import Collapse from "@material-ui/core/Collapse";
import Columns from "../../components/Columns";
import Filter from "../../components/Filter/Filter";
import {
  getAllExercices,
  deleteOneExercice,
  getGroupedExercises,
} from "../../redux/slices/exercices";
import { getAllLessons } from "../../redux/slices/lessons";
import { getAllExercicesTypes } from "../../redux/slices/exercicesTypes";
import { useDispatch, useSelector } from "react-redux";
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
    width: "14%",
    show: true,
    sortable: false,
  },
  { accessor: "title", label: "Title", width: "14%", show: true },

  { accessor: "order", label: "Order", width: "14%", show: true },

  {
    accessor: "lessonId.title",
    name: "lessonId",
    label: "Lesson",
    width: "14%",
    show: true,
    sortable: false,
  },
  {
    accessor: "exerciceTypeId.title",
    name: "Type",
    label: "exercise type",
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
const fieldSearchable = ["name"];

const ExerciseList = () => {
  const { exercices, loading } = useSelector((state) => state.exercices);
  const { lessons } = useSelector((state) => state.lessons);
  const { exerciceTypes } = useSelector((state) => state.exercicesTypes);

  const fieldFilterable = [
    { name: "title", label: "title", type: "text" },
    {
      name: "lessonId",
      label: "lesson",
      type: "dropdown",
      options: lessons,
    },
    {
      name: "exerciceTypeId",
      label: "type",
      type: "dropdown",
      options: exerciceTypes,
    },
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
    if (exercices.length === 0) {
      dispatch(getAllExercices(""));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllLessons(""));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllExercicesTypes(""));
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
    dispatch(getAllQuestions(""));
    dispatch(getGroupedExercises("?grouped=true&sort=-order,title"));
  };

  return (
    <div className={classes.root}>
      <Toolbar
        toggleFilters={toggleFilters}
        toggleColumns={toggleColumns}
        searchChange={searchChange}
        pageLink={"/contents/exercises"}
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
            handelFilter={getAllExercices}
          />
        </Collapse>
        <Table
          loading={loading}
          columns={columns}
          data={exercices}
          deleteItem={deleteOneExercice}
          handleSortChange={handleSortChange}
          sort={sort}
          handlePageChange={handlePageChange}
          page={page}
          tableService={""}
          rowsPerPage={rowsPerPage}
          handleRowsPerPageChange={handleRowsPerPageChange}
          pageLink={"/contents/exercises"}
          otherFunction={dispatchOnDelete}
        />
      </div>
    </div>
  );
};

export default ExerciseList;
