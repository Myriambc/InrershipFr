import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Toolbar from "../../components/Toolbar/Toolbar";
import Table from "../../components/Table/Table";
import optionsParser from "../../helpers/optionsParser";
import Loading from "../../components/Loading/Loading";
import Collapse from "@material-ui/core/Collapse";
import Columns from "../../components/Columns";
import Filter from "../../components/Filter/Filter";
import { api_delete, api_get, get_file, api_put } from "../../utils/Api";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  },
}));

const TableList = (props) => {
  const {
    columnsList,
    fieldSearchable,
    fieldFilterable,
    url,
    exportUrl,
    pageLink,
    searchMessage,
    baseUrl,
    noFilter,
    noShow,
    cacheUrl,
    noDelete,
    noExport,
    noEdit,
    noAction,
    removeAdd,
    offerAction,
    noPagination,
    noCheck,
    restore,
    deleteUrl,
    keyValue,
    ...rest
  } = props;
  const [search, searchChange] = useState("");
  const [filters, filtersChange] = useState({});
  const [isSearch, setIsSearch] = useState(false);
  const [columns, columnsChange] = useState(columnsList);
  const [sort, sortChange] = useState({ accessor: "id", order: "desc" });
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [columnsOpen, setColumnsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(24);
  useEffect(() => {
    getData();
  }, [page, sort, rowsPerPage]);

  useEffect(() => {
    if (search.length) {
      const options = optionsParser(search, null, sort, fieldSearchable);
      setIsSearch(true);
      setPage(1);
      //getData();
      api_get(`${url}?page=${page}${options}`).then((data) => {
        setData(data);
      });
    }
    if (Object.keys(filters).length) {
      const options = optionsParser(null, filters, sort, fieldSearchable);
      setPage(1);
      api_get(
        `${url}?page=${page}${options}&perPage=${rowsPerPage}&searchJoin=and`
      ).then((data) => {
        setData(data);
      });
    }
  }, [filters, search]);
  useEffect(() => {
    if (!search && isSearch) {
      setIsSearch(false);
      setPage(1);
      getData();
    }
  }, [search]);
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

  const getData = () => {
    const options = optionsParser(search, filters, sort, fieldSearchable);
    api_get(`${url}?page=${page}${options}&perPage=${rowsPerPage}`).then(
      (data) => {
        setData(data);
      }
    );
  };

  const getListData = () => {
    const options = optionsParser(null, null, sort, null);
    api_get(
      `${url}?searchJoin=and&page=${page}${options}&perPage=${rowsPerPage}`
    ).then((data) => {
      setData(data);
    });
  };

  const handlePageChange = (event, page) => {
    setPage(page + 1);
  };
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
    //getData(event.target.value)
  };
  const handleExport = () => {
    const options = optionsParser(search, filters, sort, fieldSearchable);
    get_file(
      `${exportUrl}?searchJoin=and&page=${page}${options}`
    ).then((data) => {});
  };
  const classes = useStyles();
  if (!data.payload) {
    return <Loading />;
  }

  return (
    <div className={classes.root}>
      <Toolbar
        toggleFilters={toggleFilters}
        toggleColumns={toggleColumns}
        searchChange={searchChange}
        pageLink={pageLink}
        searchMessage={searchMessage}
        handleExport={handleExport}
        removeAdd={removeAdd}
        noExport={noExport}
        cacheUrl={cacheUrl}
        cache_method={api_get}
        initializeData={getListData}
      />
      <div className={classes.content}>
        <Collapse in={columnsOpen}>
          <Columns columnsChange={columnsChange} columns={columns} />
        </Collapse>
        <Collapse in={filtersOpen}>
          {noFilter !== true && (
            <Filter
              fields={fieldFilterable}
              values={filters}
              filtersChange={filtersChange}
              initializeData={getListData}
            />
          )}
        </Collapse>
        <Table
          columns={columns}
          data={data}
          handleSortChange={handleSortChange}
          sort={sort}
          handlePageChange={handlePageChange}
          page={page}
          tableService={{
            method: restore == true ? api_put : api_delete,
            base_url: `${baseUrl}`,
            cache_method: api_get,
            base_cache_url: `${cacheUrl}`,
          }}
          rowsPerPage={rowsPerPage}
          handleRowsPerPageChange={handleRowsPerPageChange}
          pageLink={pageLink}
          initializeData={getData}
          noShow={noShow}
          noPagination={noPagination}
          noCheck={noCheck}
          noDelete={noDelete}
          noAction={noAction}
          noEdit={noEdit}
          offerAction={offerAction}
          deleteUrl={deleteUrl}
          keyValue={keyValue}
        />
      </div>
    </div>
  );
};

export default TableList;
