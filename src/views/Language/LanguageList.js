import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Toolbar from "../../components/Toolbar/Toolbar";
import Table from "../../components/Table/Table";
import Collapse from "@material-ui/core/Collapse";
import Columns from "../../components/Columns";
import Filter from "../../components/Filter/Filter";
import {
  deleteOneLanguage,
  getAllLanguages,
  // getOneLanguage,
} from "../../redux/slices/languages";
import { getAllCourses } from "../../redux/slices/courses";
import { getAllLevels } from "../../redux/slices/levels";
import { getAllLessons } from "../../redux/slices/lessons";
import { getAllExercices } from "../../redux/slices/exercices";
import { getAllQuestions } from "../../redux/slices/questions";

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
    sortable: false,
  },
  {
    accessor: "title",
    label: "Name",
    width: "80%",
    show: true,
    sortable: false,
  },
];
// const fieldSearchable = ["name"];
const fieldFilterable = [{ name: "title", label: "title", type: "text" }];

const LanguageList = () => {
  const dispatch = useDispatch();

  const { languages, loading } = useSelector((state) => state.languages);
  const [search, searchChange] = useState("");
  const [filters, filtersChange] = useState({});
  const [columns, columnsChange] = useState(columnsList);
  const [sort, sortChange] = useState({ accessor: "id", order: "desc" });
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [columnsOpen, setColumnsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(24);
  const classes = useStyles();

  useEffect(() => {
    if (languages?.length === 0) {
      dispatch(getAllLanguages(""));
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
    dispatch(getAllCourses(""));
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
        pageLink={"/contents/languages"}
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
            handelFilter={getAllLanguages}
          />
        </Collapse>
        <Table
          loading={loading}
          columns={columns}
          data={languages}
          deleteItem={deleteOneLanguage}
          handleSortChange={handleSortChange}
          sort={sort}
          handlePageChange={handlePageChange}
          page={page}
          tableService={""}
          rowsPerPage={rowsPerPage}
          handleRowsPerPageChange={handleRowsPerPageChange}
          pageLink={"/contents/languages"}
          otherFunction={dispatchOnDelete}
        />
      </div>
    </div>
  );
};

export default LanguageList;
