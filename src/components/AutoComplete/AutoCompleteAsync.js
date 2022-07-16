import React, {forwardRef, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const ListboxComponent = forwardRef(({setIsScrollBottom, ...rest}, ref) => {
  const classes = useStyles();
  return (
    <ul
      className={classes.autocompleteList}
      ref={ref}
      {...rest}

      onScroll={({target}) => {
        setIsScrollBottom(
            target.scrollHeight - target.scrollTop === target.clientHeight,
        );
      }
      }
    />
  );
});

ListboxComponent.propTypes = {
  setIsScrollBottom: PropTypes.func,
};

let searchDelay;
const AutoCompleteAsync = (props) => {
  const classes = useStyles();
  const {
    getData,
    data,
    optionLabel,
    label,
    handleChange,
    value,
    error,
    helperText,
    multiple,
    ...rest
  } = props;
  const items = data.data || [];
  const meta = data.meta || [];

  const [loading, setLoading] = useState(false);
  const [isScrollBottom, setIsScrollBottom] = useState(false);
  const [options, setOptions] = useState(items || []);
  useEffect(() => {
    if (options.length <= 0) {
      setOptions(items);
    } else {
      setOptions((prevOptions) => prevOptions.concat(items));
    }
  }, [data]);

  useEffect(() => {
    const currentPage = Math.ceil(options.length / meta.per_page);
    if (isScrollBottom && meta.last_page > currentPage) {
      getData(`${currentPage + 1}`);
    }
  }, [isScrollBottom]);

  const handleSearch = (event, searchValue) => {
    if (!searchDelay) {
      setLoading(true);
      searchDelay = setTimeout(() => {
        setOptions([]);
        getData(1, searchValue);
        searchDelay = null;
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <Autocomplete
      multiple={multiple && multiple}
      ListboxProps={{style: {maxHeight: '200px'}}}
      ListboxComponent={(listboxProps) => (
        <ListboxComponent
          {...listboxProps}
          setIsScrollBottom={setIsScrollBottom}
        />
      )}
      options={options}
      getOptionLabel={(option) => option[optionLabel] || ''}
      getOptionSelected={(option, value) => option === value}
      value={value || 0}
      onInputChange={handleSearch}
      onChange={(event, newValue) => handleChange(event, newValue)}
      loading={loading}
      id={`autocomplete-${label}`}
      renderInput={(params) => (
        <TextField
          fullWidth
          {...params}
          variant="outlined"
          label={`${label} (${options.length}/${meta.total || '0'})`}
          className={classes.autocomplete}
          error={error}
          helperText={helperText}
        />
      )}
      disableCloseOnSelect={multiple && multiple}
      renderOption={
        multiple ?
          (option, {selected}) => (
            <React.Fragment>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{marginRight: 8}}
                checked={selected}
              />
              {option[optionLabel]}
            </React.Fragment>
          ) :
          null
      }
    />
  );
};

AutoCompleteAsync.propTypes = {
  data: PropTypes.object,
  getData: PropTypes.func,
  optionLabel: PropTypes.string,
  label: PropTypes.string,
  handleChange: PropTypes.func,
  value: PropTypes.number,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  multiple: PropTypes.bool,
};

export default AutoCompleteAsync;
