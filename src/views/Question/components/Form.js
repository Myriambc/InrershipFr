// @flow
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
import FormControl from "@material-ui/core/FormControl";
import { useParams } from "react-router-dom";
import SnackBar from "../../../components/SnackBar";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  insertQuestion,
  getAllQuestions,
  updateOneQuestion,
  getGroupedQuestions,
} from "../../../redux/slices/questions";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllExercices } from "../../../redux/slices/exercices";
import validateObj from "helpers/validateObj";
import QuestionBlockForm from "../QuestionBlock/questionBlockCreate";
import QuestionBlockEdit from "../QuestionBlock/questionBlockEdit";
import { getQuestionsBlocTypes } from "redux/slices/questionsBlocTypes";
import { serialize } from "object-to-formdata";
import { nanoid } from "nanoid";
import FilterExercise from "./FilterExercise";
import { validateOnCreate } from "validations/validate";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  content: {
    padding: 0,
  },
  formControl: {
    marginBottom: "13px",
  },
}));

const Form = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();
  const { className, edit, ...rest } = props;

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });
  const [types, setTypes] = useState([]);
  const [message, setAlertMessage] = useState("All fields are required");
  const [severity, setAlertSeverity] = useState("error");
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { questionBlocTypes } = useSelector((state) => state.questionBlocTypes);
  const { exercices } = useSelector((state) => state.exercices);
  const { questions } = useSelector((state) => state.questions);

  useEffect(() => {
    if (exercices.length === 0) dispatch(getAllExercices(""));
  }, [dispatch]);

  useEffect(() => {
    if (questions.length === 0) dispatch(getAllQuestions(""));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getQuestionsBlocTypes(""));
  }, [dispatch]);

  const question = questions.find((el) => el._id === id);
  //validations
  const validationOnCreate = Yup.object().shape({
    title: Yup.string().required("Required"),
    exerciceId: Yup.string().required("Required"),
  });
  const validationOnUpdate = Yup.object().shape({
    title: Yup.string(),
    exerciceId: Yup.string(),
  });
  const validate = (values) => {
    return validateOnCreate(values);
  };

  //submit
  function onSubmit(values, { setSubmitting }) {
    if (!id) {
      //CREATE;
      dispatch(insertQuestion(serialize(values, { indices: true }))).then(
        () => {
          dispatch(getAllQuestions(""));
          dispatch(getGroupedQuestions("?grouped=true&sort=-order,title"));
          history.push("/contents/Questions");
        }
      );
      setAlertMessage("Question Created successfully");
      setAlertSeverity("success");
    } else {
      //UPDATE
      const validValues = validateObj(question, values);
      if (Object.keys(validValues).length === 0) {
        setAlertMessage("Nothing To Update");
        setAlertSeverity("error");
        return;
      } else {
        dispatch(updateOneQuestion({ id, ...validValues })).then(() => {
          dispatch(getAllQuestions(""));
          dispatch(getGroupedQuestions("?grouped=true&sort=-order,title"));

          history.push("/contents/questions");
        });
        setAlertMessage("Question Updated Successfully");
        setAlertSeverity("success");
      }
    }
  }
  return (
    <div>
      <Card {...rest} className={clsx(classes.root, className)}>
        <Formik
          initialValues={{
            title: id ? question?.title : "",
            exerciceId: id ? question?.exerciceId?._id : "",
            questionBlocks: [],
          }}
          validationSchema={id ? validationOnUpdate : validationOnCreate}
          validate={validate}
          onSubmit={onSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => (
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <CardHeader subheader="Question Form" />
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      error={Boolean(touched.title && errors.title)}
                      helperText={touched.title && errors.title}
                      name="title"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.title}
                      variant="outlined"
                      label="title"
                    />
                  </Grid>
                  <FilterExercise />
                  <Grid item md={3} xs={12}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="exerciceId">Exercise</InputLabel>
                      <Select
                        error={Boolean(touched.exerciceId && errors.exerciceId)}
                        helperText={touched.exerciceId && errors.exerciceId}
                        labelId="exerciceId"
                        id="exerciceId"
                        name="exerciceId"
                        value={values.exerciceId}
                        label="Exercise"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        defaultValue=""
                      >
                        {exercices.map((el, index) => (
                          <MenuItem key={index} value={el._id}>
                            {el.title}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {id && (
                    <Grid item md={12} xs={12}>
                      <Button
                        color="primary"
                        type="submit"
                        variant="contained"
                        onClick={() => handleClick()}
                      >
                        Update Question
                      </Button>
                    </Grid>
                  )}
                  <Grid item md={12} xs={12}>
                    {id && <QuestionBlockEdit setTypes={setTypes} />}
                    <>
                      <FormControl
                        variant="outlined"
                        fullWidth
                        className={classes.formControl}
                      >
                        <InputLabel id="questionType">
                          Question Block Type
                        </InputLabel>
                        <Select
                          labelId="questionType"
                          id="questionType"
                          name="question"
                          defaultValue=""
                          label="Question Block Type"
                          onChange={(e) => {
                            setTypes([
                              ...types,
                              { ...e.target.value, id: nanoid() },
                            ]);
                          }}
                          onBlur={handleBlur}
                        >
                          {questionBlocTypes.map((el, index) => (
                            <MenuItem key={index} value={el}>
                              {el.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <Grid item xs={12}>
                        <QuestionBlockForm
                          types={types}
                          setTypes={setTypes}
                          setAlertMessage
                          questionId={id}
                        />
                      </Grid>
                    </>
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <CardActions>
                {!id && (
                  <Button
                    color="primary"
                    type="submit"
                    variant="contained"
                    onClick={() => handleClick()}
                  >
                    Add Question
                  </Button>
                )}
              </CardActions>
            </form>
          )}
        </Formik>
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

Form.propTypes = {
  className: PropTypes.string,
  edit: PropTypes.bool,
  handleCloseLoading: PropTypes.func,
  loading: PropTypes.bool,
};

export default Form;
