import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import BooleanFilter from "./Basic/BooleanFilter";
import TextFilter from "./Basic/TextFilter";
import DropdownFilter from "./Basic/DropdownFilter";
import DivisionAutocompleteFilter from "./Autocomplete/DivisionAutocompleteFilter";
import UserGroupAutocompleteFilter from "./Autocomplete/UserGroupAutocompleteFilter";
import UserAutocompleteFilter from "./Autocomplete/UserAutcompleteFilter";
import DateFilter from "./Basic/DateFilter";
import DateRangeFilter from "./Basic/DateRangeFilter";
import NumberRangeFilter from "./Basic/NumberRangeFilter";
import NumberFilter from "./Basic/NumberFilter";
import OfferAutocompleteFilter from "./Autocomplete/OfferAutocompleteFilter";
import SubjectAutocompleteFilter from "./Autocomplete/SubjectAutocompleteFilter";
import InstructorAutocompleteFilter from "./Autocomplete/InstructorAutcompleteFilter";
import StateAutocompleteFilter from "./Autocomplete/StateAutocompleteFilter";
import mapStateToRequest from "../../helpers/mapStateToRequest";
import AdminAutocompleteFilter from "./Autocomplete/AdminAutocompleteFilter";
import LevelAutocompleteFilter from "./Autocomplete/LevelAutocompleteFilter";
import DateTimeFilter from "./Basic/DateTimeFilter";
import { CloudLightning } from "react-feather";
import objToString from "../../helpers/objToString";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  spacer: {
    flexGrow: 1,
  },
  card: {},
  cardContent: {
    paddingBottom: "16px !important",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  autocomplete: {
    marginTop: theme.spacing(1),
  },
  textField: {
    minWidth: "100%",
  },
  resetButton: {
    marginLeft: theme.spacing(1),
  },
}));

const Filter = (props) => {
  const dispatch = useDispatch();
  const {
    className,
    filtersChange,
    handelFilter,
    fields,
    values,
    pageLink,
    initializeData,
    rowsPerPage,
    ...rest
  } = props;
  const classes = useStyles();
  const [filterValues, setFilterValues] = useState({});

  useEffect(() => {
    if (
      filterValues.points &&
      filterValues.points[0] == undefined &&
      filterValues.points[1] == undefined
    ) {
      setFilterValues({});
    }
  }, [filterValues.points]);

  const filterValuesChange = (value) => {
    setFilterValues({
      ...filterValues,
      ...value,
    });
  };

  const submitFilter = () => {
    let ignoreField = [];
    for (const v in filterValues) {
      if (filterValues[v]?.length === 2) {
        ignoreField.push(v);
      }
    }
    filtersChange(mapStateToRequest(filterValues, ignoreField));
    const filtersString = objToString(filterValues);
    dispatch(handelFilter(filtersString));
  };

  const resetFilter = () => {
    setFilterValues({});
    // initializeData(rowsPerPage);
    dispatch(handelFilter(""));
  };

  const renderType = (field) => {
    switch (field.type) {
      case "boolean":
        return (
          <BooleanFilter
            values={filterValues}
            filtersChange={filterValuesChange}
            field={field}
          />
        );
      case "text":
        return (
          <TextFilter
            values={filterValues}
            filtersChange={filterValuesChange}
            field={field}
          />
        );
      case "number":
        return (
          <NumberFilter
            values={filterValues}
            filtersChange={filterValuesChange}
            field={field}
          />
        );
      case "dropdown":
        return (
          <DropdownFilter
            values={filterValues}
            filtersChange={filterValuesChange}
            field={field}
          />
        );
      case "date":
        return (
          <DateFilter
            values={filterValues}
            filtersChange={filterValuesChange}
            field={field}
          />
        );
      case "dateTime":
        return (
          <DateTimeFilter
            values={filterValues}
            filtersChange={filterValuesChange}
            field={field}
          />
        );
      case "dateRange":
        return (
          <DateRangeFilter
            values={filterValues}
            filtersChange={filterValuesChange}
            field={field}
          />
        );
      case "divisionAutocomplete":
        return (
          <DivisionAutocompleteFilter
            values={filterValues}
            filtersChange={filterValuesChange}
            field={field}
          />
        );
      case "offerAutocomplete":
        return (
          <OfferAutocompleteFilter
            values={filterValues}
            filtersChange={filterValuesChange}
            field={field}
          />
        );
      case "userGroupAutocomplete":
        return (
          <UserGroupAutocompleteFilter
            values={filterValues}
            filtersChange={filterValuesChange}
            field={field}
          />
        );
      case "userAutocomplete":
        return (
          <UserAutocompleteFilter
            values={filterValues}
            filtersChange={filterValuesChange}
            field={field}
          />
        );
      case "subjectAutocomplete":
        return (
          <SubjectAutocompleteFilter
            values={filterValues}
            filtersChange={filterValuesChange}
            field={field}
          />
        );

      case "instructorAutocomplete":
        return (
          <InstructorAutocompleteFilter
            values={filterValues}
            filtersChange={filterValuesChange}
            field={field}
          />
        );

      case "stateAutocomplete":
        return (
          <StateAutocompleteFilter
            values={filterValues}
            filtersChange={filterValuesChange}
            field={field}
          />
        );

      case "adminAutocomplete":
        return (
          <AdminAutocompleteFilter
            values={filterValues}
            filtersChange={filterValuesChange}
            field={field}
          />
        );

      case "levelAutocompleteFilter":
        return (
          <LevelAutocompleteFilter
            values={filterValues}
            filtersChange={filterValuesChange}
            field={field}
          />
        );
      case "numberRange":
        return (
          <NumberRangeFilter
            values={filterValues}
            filtersChange={filterValuesChange}
            field={field}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Grid container spacing={2} alignItems="center">
            {fields.map((f) => (
              <Grid item xs={12} md={3} key={f.name}>
                {renderType(f)}
              </Grid>
            ))}
            <Grid item xs={6} md={"auto"}>
              <Button
                variant="contained"
                color="primary"
                onClick={submitFilter}
              >
                Filter
              </Button>

              <Button
                className={classes.resetButton}
                variant="contained"
                onClick={resetFilter}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

Filter.propTypes = {
  className: PropTypes.string,
  filtersChange: PropTypes.func,
  initializeData: PropTypes.func,
  fields: PropTypes.array,
  values: PropTypes.object,
};

export default Filter;
