import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import optionsParser from '../../../helpers/optionsParser';
import {AsyncPaginate} from 'react-select-async-paginate';
import theme from '../../../theme';
import { api_get } from "../../../utils/Api";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const OfferAutocompleteFilter = (props) => {
  const {className, filtersChange, field, values, ...rest} = props;
  const classes = useStyles();
  const getOffers = async (search, prevData, page) => {
    const options = optionsParser(search, null, null, ['name']);
    const result = await api_get(`offers?page=${page.page}${options}`);
    return {
      options: [...result.payload],
      hasMore: result.meta.current_page !== result.meta.last_page,
      additional: {
        page: result.meta.current_page + 1,
      },
    };
  };
  const handleChange = (value) => {
    filtersChange({
      [field.name]: value,
    });
  };
  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <AsyncPaginate
        loadOptions={getOffers}
        onChange={handleChange}
        getOptionLabel={(option) => option.name}
        getOptionValue={(option) => option.id}
        placeholder={field.label}
        isClearable={true}
        isMulti
        additional={{
          page: 1,
        }}
        value={values[field.name] || null}
        styles={{
          placeholder: (base) => ({
            ...base,
            color: '#000',
            fontSize: theme.typography.fontSize,
            fontFamily: theme.typography.fontFamily,
          }),
        }}
        menuPortalTarget={document.querySelector('body')}
      />
    </div>
  );
};

OfferAutocompleteFilter.propTypes = {
  className: PropTypes.string,
  filtersChange: PropTypes.func,
  field: PropTypes.object,
  values: PropTypes.object,
  handleChange: PropTypes.func,
};

export default OfferAutocompleteFilter;
