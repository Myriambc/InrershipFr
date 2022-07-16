import React, { useEffect, useState } from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import { nanoid } from "nanoid";
import BtnAddRemove from "components/BtnAddRemove";
import { useFormikContext } from "formik";
import Divider from "components/Divider/Divider";
import { handleAdd } from "helpers/handleAdd";
import { checkError, handleBlur } from "helpers/checkError";

export default function OneCorrectChoiceBlock(props) {
  const formikProps = useFormikContext();
  const [answers, setAnswers] = useState([{ content: "required" }]);
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
    event.persist();
    setAnswers((prevData) => {
      const newValue = answers?.map((el, i) => {
        if (i === wordIndex) {
          if (event.target.value !== "") {
            el.content = "valid";
          } else {
            el.content = "required";
          }
        }
        return el;
      });
      setAnswers(newValue);
    });
    const fieldValues = [...values];
    switch (event.target.name) {
      case "answers":
        fieldValues[index].answers[wordIndex] = {
          content: event.target.value,
          id: wordIndex.toString(),
        };
        fieldValues[index]["correctAnswerId"] = "0";
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
      {answers?.map((el, anserIndex) => (
        <React.Fragment key={anserIndex}>
          <Grid item md={3} sm={6} xs={6}>
            <TextField
              error={Boolean(
                checkError(
                  "answers",
                  type?.code,
                  index,
                  formikProps,
                  anserIndex + 1,
                  "first_level"
                )
              )}
              helperText={
                checkError(
                  "answers",
                  type?.code,
                  index,
                  formikProps,
                  anserIndex + 1,
                  "first_level"
                ) && "required"
              }
              fullWidth
              name="answers"
              onChange={(e) => handleChange(e, index, type._id, anserIndex)}
              type="text"
              variant="outlined"
              label="Answer"
              defaultValue=""
              onBlur={(e) =>
                handleBlur(e, type?.code, index, formikProps, anserIndex + 1)
              }
            />
            <input
              type="checkbox"
              id="correctAnswerId"
              name="correctAnswerId"
              onChange={(e) => handleChange(e, index, type._id)}
              value={anserIndex}
            ></input>
          </Grid>
          <Grid item>
            <Button
              className={classes.btn}
              variant="contained"
              onClick={(e) => {
                setAnswers([...answers, { content: "required" }]);
                handleAdd(setValues, index, "answers", { content: "", id: "" });
              }}
            >
              +
            </Button>
          </Grid>
        </React.Fragment>
      ))}

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
      />
    </>
  );
}
