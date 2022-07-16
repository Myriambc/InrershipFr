import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import momentAdapter from '@material-ui/pickers/adapter/moment';
import {DateTimePicker, LocalizationProvider} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
    root: {},
}));

const DateTimeFilter = (props) => {
    const {className, filtersChange, field, values, ...rest} = props;
    const classes = useStyles();
    const handleChange = (value) => {
        if (value) {
            filtersChange({
                [field.name]: value.format('YYYY-MM-DD HH:mm:00'),
            });
        }
    };
    return (
        <div {...rest} className={clsx(classes.root, className)}>
            <LocalizationProvider dateAdapter={momentAdapter}>
                <DateTimePicker
                    id={field.name}
                    label={field.label}
                    inputVariant="outlined"
                    value={values[field.name] || null}
                    onChange={handleChange}
                    autoOk
                    ampm={false}
                    renderInput={(props) => <TextField
                        {...props}
                        FormHelperTextProps={{ style:{display: 'none'} }}
                        fullWidth
                        variant="outlined"
                        size="small"
                    />}
                />
            </LocalizationProvider>
        </div>
    );
};

DateTimeFilter.propTypes = {
    className: PropTypes.string,
    filtersChange: PropTypes.func,
    field: PropTypes.object,
    values: PropTypes.object,
    handleChange: PropTypes.func,
};

export default DateTimeFilter;
