import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Toolbar from "../../components/Toolbar/Toolbar";
import Table from "../../components/Table/Table";
import Collapse from "@material-ui/core/Collapse";
import Columns from "../../components/Columns";
import Filter from "../../components/Filter/Filter";
import {
  getAllQuestions,
  getGroupedQuestions,
} from "../../redux/slices/questions";
import { deleteOneQuestion } from "../../redux/slices/questions";
import { getAllExercices } from "../../redux/slices/exercices";
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
    width: "16%",
    show: true,
    sortable: false,
  },
  { accessor: "title", label: "Name", width: "16%", show: true },
  {
    accessor: "exerciceId.title",
    name: "exerciceId",
    label: "Exercise",
    width: "16%",
    show: true,
    sortable: false,
  },
  {
    accessor: "order",
    name: "order",
    label: "Order",
    width: "16%",
    show: true,
    sortable: false,
  },
  {
    accessor: "createdAt",
    name: "createdAt",
    label: "Created At",
    width: "16%",
    show: true,
    sortable: false,
    type: "date",
  },
  {
    accessor: "updatedAt",
    name: "updatedAt",
    label: "Updated At",
    width: "16%",
    show: true,
    sortable: false,
    type: "date",
  },
];
const fieldSearchable = ["name"];

const QuestionList = () => {
  const { questions, loading } = useSelector((state) => state.questions);
  const { exercices } = useSelector((state) => state.exercices);

  const fieldFilterable = [
    { name: "title", label: "title", type: "text" },
    {
      name: "exerciceId",
      label: "exercise",
      type: "dropdown",
      options: exercices,
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
    if (questions?.length === 0) {
      dispatch(getAllQuestions(""));
    }
  }, [dispatch]);

  useEffect(() => {
    if (exercices?.length === 0) {
      dispatch(getAllExercices(""));
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
  const dispatchOnDelete = () => {
    dispatch(getAllQuestions(""));
    dispatch(getGroupedQuestions("?grouped=true&sort=-order,title"));
  };
  return (
    <div className={classes.root}>
      <Toolbar
        toggleFilters={toggleFilters}
        toggleColumns={toggleColumns}
        searchChange={searchChange}
        pageLink={"/contents/questions"}
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
            handelFilter={getAllQuestions}
          />
        </Collapse>
        <Table
          loading={loading}
          columns={columns}
          data={questions}
          deleteItem={deleteOneQuestion}
          handleSortChange={handleSortChange}
          sort={sort}
          handlePageChange={handlePageChange}
          page={page}
          tableService={""}
          rowsPerPage={rowsPerPage}
          handleRowsPerPageChange={handleRowsPerPageChange}
          pageLink={"/contents/questions"}
          otherFunction={dispatchOnDelete}
        />
      </div>
    </div>
  );
};

export default QuestionList;
