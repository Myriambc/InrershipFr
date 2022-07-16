import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import SnackBar from "../SnackBar";

import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
}));
const Delete = (props) => {
  const dispatch = useDispatch();

  const {
    className,
    handleDelete,
    open,
    itemId,
    deleteItem,
    handleClose,
    service,
    pageLink,
    restore,
    initializeData,
    rowsPerPage,
    replace,
    otherFunction,
    questionId,
    ...rest
  } = props;
  const classes = useStyles();
  const [openAlert, setOpenAlert] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [eventId, setEventId] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [severity, setAlertSeverity] = React.useState("success");
  const handleCheckChange = () => {
    setChecked(!checked);
  };

  // const handleClose = () => {
  //   setOpenAlert(false);
  //   setChecked(false);
  //   setEventId("");
  // };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Dialog
        open={open}
        onClose={handleDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {pageLink == "/user-settings/banned-users"
            ? "Unblock User Confirmation"
            : "Delete Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {pageLink == "/user-settings/banned-users"
              ? "Are you sure to continue unblocking this user?"
              : "Are you sure to continue deleting?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              dispatch(deleteItem(itemId)).then(() => {
                if (otherFunction) {
                  otherFunction();
                }
              });
              handleDelete();
              handleClose();
            }}
            color="primary"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <SnackBar
        open={openAlert}
        handleClose={handleClose}
        message={
          pageLink == "/user-settings/banned-users"
            ? "User is successfully unblocked"
            : message
        }
        severity={
          pageLink == "/user-settings/banned-users" ? "success" : severity
        }
      />
    </div>
  );
};

Delete.propTypes = {
  className: PropTypes.string,
  open: PropTypes.bool,
  handleDelete: PropTypes.func,
  // itemId: PropTypes.number,
};

export default Delete;
