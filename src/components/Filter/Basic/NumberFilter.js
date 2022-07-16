import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
const useStyles = makeStyles((theme) => ({
  root: {},
}));

const BooleanFilter = (props) => {
  const {className, filtersChange, field, values, ...rest} = props;
  const classes = useStyles();
  const handleChange = (e) => {
    filtersChange({
      [field.name]: e.target.value,
    });
  };
  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <TextField
        id={field.name}
        label={field.label}
        value={values[field.name] || ''}
        type="number"
        fullWidth
        size="small"
        variant="outlined"
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
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
