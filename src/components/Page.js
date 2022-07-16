import React, {
  forwardRef,
  useEffect,
  useCallback,
} from 'react';
import {Helmet} from 'react-helmet';
import {useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';

const Page = forwardRef(({
  children,
  title = '',
  ...rest
}, ref) => {
  const location = useLocation();


  return (
    <div
      ref={ref}
      {...rest}
    >
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </div>
  );
});

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default Page;
