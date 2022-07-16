import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
const useStyles = makeStyles((theme) => ({
  root: {},
}));

const BooleanFilter = (props) => {
  const {className, filtersChange, field, values, ...rest} = props;
  const classes = useStyles();
  const handleChange = (e) => {
    filtersChange({
      [field.name]: e.target.checked,
    });
  };
  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <FormControlLabel
        control={
          <Switch
            checked={values[field.name] || false}
            onChange={handleChange}
            color="primary"
          />
        }
        label={field.label}
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
