import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import {Divider} from '@material-ui/core';

const Dialogs = (props)=> {
  const {handleClose, open, contentValue}=props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={fullScreen}
    >
      <DialogTitle
        id="responsive-dialog-title">Points history</DialogTitle>
      <DialogContent>
        {contentValue.map((value)=>{
          return (
            <div>
              <DialogContentText>
                {value.points}
              </DialogContentText>
              <DialogContentText>
                {value.purpose}
              </DialogContentText>
              <DialogContentText>
                {value.created_at}
              </DialogContentText>
              <Divider/>
            </div>
          );
        })}

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
        Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default Dialogs;
