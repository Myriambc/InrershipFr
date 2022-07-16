import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import React from 'react';

const SnackBar=(props) =>{
  const {handleClose, open, severity, message}=props;
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
      anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
