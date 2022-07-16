import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
} from "@material-ui/core";
import clsx from "clsx";
import PropTypes from "prop-types";
import SnackBar from "../../../components/SnackBar";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";
import Moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      maxWidth: 360,
    },
  },
}));

const SubscriptionsForm = (props) => {
  const { className, points, userId, ...rest } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [message, setAlertMessage] = useState("");
  const [severity, setAlertseverity] = useState("");
  const [tab, setTab] = useState(0);
  const [userSubscriptions, getSubscriptions] = useState([]);
  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      "aria-controls": `scrollable-auto-tabpanel-${index}`,
    };
  }

  useEffect(() => {}, []);
  const tableCell = [
    "id",
    "Name",
    "Division",
    "Active",
    "Responsible",
    "End date",
    "Created At",
    "Action",
  ];
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Grid container spacing={3}>
        <Card {...rest} className={clsx(classes.root, className)}>
          <form autoComplete="off" noValidate>
            <CardHeader subheader="The information can be edited" />
            <Divider />
            {userSubscriptions?.length ? (
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      {tableCell.map((tableCell) => {
                        return <TableCell>{tableCell}</TableCell>;
                      })}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userSubscriptions.map((subscription) => (
                      <TableRow key={subscription.name}>
                        <TableCell component="th" scope="row">
                          {subscription.id}
                        </TableCell>
                        <TableCell>{subscription.group.name}</TableCell>
                        <TableCell>{subscription.division.name}</TableCell>
                        <TableCell>{subscription.active.toString()}</TableCell>
                        <TableCell>{subscription.responsible}</TableCell>
                        <TableCell>
                          {Moment(subscription.end_date).format(
                            "YYYY-MM-DD hh:mm"
                          )}
                        </TableCell>
                        <TableCell>
                          {Moment(subscription.created_at).format(
                            "YYYY-MM-DD hh:mm"
                          )}
                        </TableCell>
                        <TableCell>
                          <IconButton
                            className={classes.signOutButton}
                            color="inherit"
                            component={Link}
                            to={"url"}
                            target="_blank"
                          >
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  This user does not have any subscription
                </Typography>
              </CardContent>
            )}
          </form>
        </Card>

        <SnackBar
          open={open}
          message={message}
          severity={severity}
          handleClose={handleClose}
        />
      </Grid>
    </div>
  );
};
SubscriptionsForm.propTypes = {
  className: PropTypes.string,
};

export default SubscriptionsForm;
