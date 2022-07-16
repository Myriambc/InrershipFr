import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Backdrop } from '@material-ui/core';
import PropTypes from 'prop-types';


const useStyles = makeStyles((theme) => ({
  root: {
    'width': '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function LoadingApi(props) {
    const {open, onClick, ...rest } = props;
    const classes = useStyles();
    return (
        <div className={classes.root}>
      <Backdrop className={classes.backdrop} open={open} onClick={onClick}>
        <CircularProgress color="inherit" />
      </Backdrop>  
        </div>
    )
}



export default LoadingApi


  