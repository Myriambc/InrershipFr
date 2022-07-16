import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
const useStyles = makeStyles((theme) => ({
  root: {},
  menuItem: {
    textTransform: "capitalize",
  },
}));

const BooleanFilter = (props) => {
  const { className, filtersChange, field, values, ...rest } = props;
  const classes = useStyles();
  const handleChange = (e) => {
    filtersChange({
      [field.name]: e.target.value,
    });
  };
  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <FormControl
        className={classes.formControl}
        fullWidth
        variant="outlined"
        size="small"
      >
        <InputLabel id={field.name + "-label"}>{field.label}</InputLabel>
        <Select
          labelId={field.name + "-label"}
          id={field.name}
          label={field.label}
          value={values[field.name] || ""}
          onChange={handleChange}
        >
          {field?.options?.map((o) => (
            <MenuItem value={o._id} key={o} className={classes.menuItem}>
              {o.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

BooleanFilter.propTypes = {
  className: PropTypes.string,
  filtersChange: PropTypes.func,
  field: PropTypes.object,
  values: PropTypes.object,
  handleChange: PropTypes.func,
};

export default BooleanFilter;
