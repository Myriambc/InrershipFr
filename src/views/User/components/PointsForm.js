import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@material-ui/core";
import clsx from "clsx";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import SnackBar from "../../../components/SnackBar";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "35%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    alignItems: "center",
  },
  column: {
    flexBasis: "33.33%",
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
  },
}));

const PointsForm = (props) => {
  const { className, points, userId, ...rest } = props;
  const classes = useStyles();
  const [values, setValues] = useState({
    points: "",
    note: "",
  });
  const [open, setOpen] = useState(false);
  const [message, setAlertMessage] = useState("");
  const [severity, setAlertseverity] = useState("");
  const [tab, setTab] = useState(0);
  const [newPoints, setNewPoints] = useState(0);
  const [pointsHistory, getPointsHistory] = useState([]);
  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      "aria-controls": `scrollable-auto-tabpanel-${index}`,
    };
  }

  useEffect(() => {}, [newPoints]);

  const handleChange = (event) => {
    setValues({});
  };
  const handleSubmit = async () => {};
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Card {...rest} className={clsx(classes.root, className)}>
        <form autoComplete="off" noValidate>
          <CardHeader subheader="The information can be edited" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={3} xs={12}>
                <TextField
                  fullWidth
                  label="Points"
                  name="points"
                  onChange={handleChange}
                  required
                  value={newPoints || points}
                  variant="outlined"
                  disabled
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item md={3} xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Ajouter/Retirer des points"
                  name="points"
                  onChange={handleChange}
                  value={values.points}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={3} xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Note"
                  name="note"
                  onChange={handleChange}
                  value={values.note}
                  variant="outlined"
                />
              </Grid>
              <Grid>
                <Box m={2.5}>
                  <Button
                    disabled={values.points === "" || values.note === ""}
                    color="primary"
                    variant="contained"
                    onClick={handleSubmit}
                  >
                    +
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <br />
            <Divider />
          </CardContent>
        </form>
      </Card>
      <SnackBar
        open={open}
        message={message}
        severity={severity}
        handleClose={handleClose}
      />
    </div>
  );
};
PointsForm.propTypes = {
  className: PropTypes.string,
};

export default PointsForm;
