import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@material-ui/core";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import SnackBar from "../../../components/SnackBar";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { api_get, api_put } from "../../../utils/Api";
import optionsParser from "../../../helpers/optionsParser";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  },
}));

const LevelsForm = (props) => {
  const { id } = useParams();
  const { className, division, ...rest } = props;
  const classes = useStyles();
  const [subjects, setSubjects] = useState([]);
  const [levels, setLevels] = useState([]);
  const [values, setValues] = useState({
    subjects: [],
    division,
    level: "",
  });
  const [open, setOpen] = useState(false);
  const [message, setAlertMessage] = useState("");
  const [severity, setAlertseverity] = useState("");
  const [tab, setTab] = useState(0);
  const [userLevels, setUserLevels] = useState(props.userLevels);
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

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setValues({});
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
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  options={subjects}
                  getOptionLabel={(option) => option?.name}
                  value={values?.subjects || []}
                  filterSelectedOptions
                  onChange={handleChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="subjects"
                      placeholder="Select a subject"
                      name="subjects"
                    />
                  )}
                />
              </Grid>
              <Grid item md={3} xs={12}>
                <Autocomplete
                  id="tags-outlined"
                  name="level_id"
                  options={levels}
                  getOptionLabel={(option) => option?.name}
                  value={values?.level || ""}
                  filterSelectedOptions
                  onChange={handleChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="levels"
                      placeholder="Select a level"
                    />
                  )}
                />
              </Grid>
              <IconButton
                color="secondary"
                style={{ backgroundColor: "transparent" }}
              >
                <AddCircleIcon />
              </IconButton>
              <Grid item md={8} xs={12}>
                <Autocomplete
                  id="combo-box-demo"
                  multiple
                  disableCloseOnSelect
                  value={userLevels}
                  options={levels}
                  freeSolo
                  open={false}
                  getOptionLabel={(option) => option}
                  getOptionSelected={(option, value) =>
                    value.student_level === option.id
                  }
                  style={{ width: 500 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="user levels"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </CardContent>

          <CardActions>
            <Button color="primary" variant="contained">
              Save details
            </Button>
          </CardActions>
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
LevelsForm.propTypes = {
  className: PropTypes.string,
};

export default LevelsForm;
