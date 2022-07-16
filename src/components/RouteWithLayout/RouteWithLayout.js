import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { isAuthenticated } from "../../utils/auth";
import { useSelector } from "react-redux";

const RouteWithLayout = (props) => {
  const { isLoggedin } = useSelector((state) => state.auth);
  const { layout: Layout, component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={(matchProps) => {
        if (!isAuthenticated() && !isLoggedin) {
          return <Redirect to='/login' />;
        }
        return (
          <Layout>
            <Component {...matchProps} />
          </Layout>
        );
      }}
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string,
};

export default RouteWithLayout;
