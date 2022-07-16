import React, { useEffect, useState } from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import { nanoid } from "nanoid";
import BtnAddRemove from "components/BtnAddRemove";
import { useFormikContext } from "formik";
import Divider from "components/Divider/Divider";
import { checkError, handleBlur } from "helpers/checkError";
import { handleAdd } from "helpers/handleAdd";

export default function DragAndDropBlock(props) {
  const formikProps = useFormikContext();
  const [drags, setDrags] = useState([{}]);
  const {
    setTypes,
    setValues,
    onRemove,
    index,
    questionId,
    types,
    values,
    type,
    classes,
  } = props;

  const handleChange = (event, index, id, wordIndex, I) => {
    const fieldValues = [...values];
    switch (event.target.name) {
      case "question":
        fieldValues[index].questions[wordIndex] = {
          content: event.target.value,
          id: nanoid(),
        };
        break;
      case "dragAnswer":
        fieldValues[index].answers[wordIndex] = {
          content: event.target.value,
          id: nanoid(),
        };
        fieldValues[index].correctAnswers[wordIndex] = {
          questionId: fieldValues[index].questions[wordIndex].id,
          answerId: fieldValues[index].answers[wordIndex].id,
        };
        break;
      default:
        fieldValues[index][event.target.name] = event.target.value;
        break;
    }
    fieldValues[index]["questionBlockTypeId"] = id;
    if (!questionId) {
      fieldValues[index]["order"] = index + 1;
      formikProps.setFieldValue("questionBlocks", values);
    }
    setValues(fieldValues);
  };

  return (
    <>
      <Divider title={type?.label} />
      {drags.map((el, i) => {
        return (
          <React.Fragment key={i}>
            <Grid item xs={6} sm={6} md={3}>
              <TextField
                error={Boolean(
                  checkError(
                    "questions",
                    type?.code,
                    index,
                    formikProps,
                    i + 1,
                    "first_level"
                  )
                )}
                helperText={
                  checkError(
                    "questions",
                    type?.code,
                    index,
                    formikProps,
                    i + 1,
                    "first_level"
                  ) && "required"
                }
                fullWidth
                name="question"
                onChange={(e) => handleChange(e, index, type._id, i)}
                type="text"
                variant="outlined"
                label="question"
                defaultValue=""
                onBlur={(e) =>
                  handleBlur(e, type?.code, index, formikProps, i + 1)
                }
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <TextField
                error={Boolean(
                  checkError(
                    "answers",
                    type?.code,
                    index,
                    formikProps,
                    i + 1,
                    "first_level"
                  )
                )}
                helperText={
                  checkError(
                    "answers",
                    type?.code,
                    index,
                    formikProps,
                    i + 1,
                    "first_level"
                  ) && "required"
                }
                fullWidth
                name="dragAnswer"
                onChange={(e) => handleChange(e, index, type._id, i)}
                type="text"
                variant="outlined"
                label="answer"
                defaultValue=""
                onBlur={(e) =>
                  handleBlur(e, type?.code, index, formikProps, i + 1)
                }
              />
            </Grid>
            <Grid item>
              <Button
                className={classes.btn}
                variant="contained"
                onClick={(e) => {
                  setDrags([...drags, ""]);
                  handleAdd(setValues, index, "questions", {
                    content: "",
                    id: "",
                  });
                  handleAdd(setValues, index, "answers", {
                    content: "",
                    id: "",
                  });
                }}
              >
                +
              </Button>
            </Grid>
          </React.Fragment>
        );
      })}
      <BtnAddRemove
        onRemove={() => onRemove(type.id, index)}
        onAdd={() => setTypes([...types, { ...type, id: nanoid() }])}
        questionId={questionId}
        obj={values[index]}
        code={type?.code}
        id={type?.id}
        setTypes={setTypes}
        setValues={setValues}
        index={index}
        isRemove
      />
    </>
  );
}
