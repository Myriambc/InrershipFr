import PropTypes from 'prop-types';
import React from 'react';
import Snackbar from './SnackBar';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({hasError: true, message: error.message});
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <Snackbar message={this.state.message}>
        {this.props.children}
      </Snackbar>;
    }
    return this.props.children;
  }
}
ErrorBoundary.propTypes = {
  children: PropTypes.node,
};
export default ErrorBoundary;
