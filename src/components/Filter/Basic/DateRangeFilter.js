import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import {
  DateRangePicker,
  DateRangeDelimiter,
  LocalizationProvider,
} from "@material-ui/pickers";
import momentAdapter from "@material-ui/pickers/adapter/moment";
import { isMoment } from "moment";
import withStyles from "@material-ui/core/styles/withStyles";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const StartField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRight: 0,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
      },
      "&:hover fieldset": {
        borderColor: "#ccc",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#ccc",
      },
    },
  },
})(TextField);

const EndField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderLeft: 0,
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0,
      },
      "&:hover fieldset": {
        borderColor: "#ccc",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#ccc",
      },
    },
  },
})(TextField);

const DateFilter = (props) => {
  const { className, filtersChange, field, values, ...rest } = props;
  const classes = useStyles();
  const handleChange = (dates) => {
    if (isMoment(dates[0]) && isMoment(dates[1])) {
      filtersChange({
        [field.name]: [
          dates[0].format("YYYY-MM-DD"),
          dates[1].format("YYYY-MM-DD"),
        ],
      });
    }
  };
  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <LocalizationProvider dateAdapter={momentAdapter}>
        <DateRangePicker
          startText={field.label}
          endText=""
          value={
            values[field.name]
              ? [values[field.name][0], values[field.name][1]]
              : [null, null]
          }
          onChange={handleChange}
          onError={() => null}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <StartField
                {...startProps}
                size="small"
                FormHelperTextProps={{ style: { display: "none" } }}
              />
              <EndField
                {...endProps}
                size="small"
                FormHelperTextProps={{ style: { display: "none" } }}
              />
            </React.Fragment>
          )}
        />
      </LocalizationProvider>
    </div>
  );
};

DateFilter.propTypes = {
  className: PropTypes.string,
  filtersChange: PropTypes.func,
  field: PropTypes.object,
  values: PropTypes.object,
  handleChange: PropTypes.func,
};

export default DateFilter;
