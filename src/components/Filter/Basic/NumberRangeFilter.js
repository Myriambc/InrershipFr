import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const NumberRangeFilter = (props) => {
  const { className, filtersChange, field, values, ...rest } = props;
  const classes = useStyles();
  const [range, setRange] = useState([]);
  const [Max, setMax] = useState(null);

// filtersChange({
//       [field.name]: [Min === "" ? null : Min, Max === "" ? null : Max],
//     });



  const handleMinChange = (e) => {
    filtersChange({
      [field.name]: [e.target?.value === "" ? undefined : e.target?.value, range[1]=== "" ? undefined :range[1]],
    });
    setRange([e.target.value,range[1]])
  };
  const handleMaxChange = (e) => {
    filtersChange({
      [field.name]: [range[0]=== "" ? undefined :range[0] , e?.target?.value === "" ? undefined :e?.target?.value],
    });
    setRange([range[0],e.target.value])
  };
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
      style={{ whiteSpace: "nowrap" }}
    >
      <Grid Container spacing={2}>
        <Grid item xs={6}>
          <TextField
            xs={2}
            id={field.name}
            label={field.label + "-Min"}
            value={range[0]}
            type="number"
            size="small"
            variant="outlined"
            onChange={handleMinChange}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            xs={2}
            id={field.name}
            label={field.label + "-Max"}
            value={range[1]}
            type="number"
            size="small"
            variant="outlined"
            onChange={handleMaxChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

NumberRangeFilter.propTypes = {
  className: PropTypes.string,
  filtersChange: PropTypes.func,
  field: PropTypes.object,
  values: PropTypes.object,
  handleChange: PropTypes.func,
};

export default NumberRangeFilter;
