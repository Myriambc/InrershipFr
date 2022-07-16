import React, { useEffect, useState } from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import { nanoid } from "nanoid";
import BtnAddRemove from "components/BtnAddRemove";
import { useFormikContext } from "formik";
import Divider from "components/Divider/Divider";
import { checkError, handleBlur } from "helpers/checkError";
// import { handleAdd } from "helpers/handleAdd";

export default function TipBlock(props) {
  const [worldList, setWorldList] = useState([""]);
  const formikProps = useFormikContext();
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
      case "worldList":
        fieldValues[index].wordList[wordIndex] = event.target.value;
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

  const handleAdd = () => {
    setValues((prevData) => {
      prevData[index].wordList = [...prevData[index].wordList, ""];
      return prevData;
    });
  };
  return (
    <>
      <Divider title={type?.label} />
      <Grid item md={3} sm={6} xs={6}>
        <TextField
          error={Boolean(checkError("text1", type.code, index, formikProps))}
          helperText={
            checkError("text1", type.code, index, formikProps) && "required"
          }
          fullWidth
          name="text1"
          onChange={(e) => handleChange(e, index, type._id)}
          type="text"
          variant="outlined"
          label="text1"
          defaultValue=""
          onBlur={(e) => handleBlur(e, type?.code, index, formikProps)}
        />
      </Grid>
      <Grid item md={3} sm={6} xs={6}>
        <TextField
          error={Boolean(checkError("text2", type.code, index, formikProps))}
          helperText={
            checkError("text2", type.code, index, formikProps) && "required"
          }
          fullWidth
          name="text2"
          onChange={(e) => handleChange(e, index, type._id)}
          type="text"
          variant="outlined"
          label="text2"
          defaultValue=""
          onBlur={(e) => handleBlur(e, type?.code, index, formikProps)}
        />
      </Grid>
      {worldList.map((el, wordIndex) => (
        <React.Fragment key={wordIndex}>
          <Grid item md={3} sm={6} xs={6}>
            <TextField
              error={Boolean(
                checkError(
                  "wordList",
                  type?.code,
                  index,
                  formikProps,
                  wordIndex + 1,
                  "first_level"
                )
              )}
              helperText={
                checkError(
                  "wordList",
                  type?.code,
                  index,
                  formikProps,
                  wordIndex + 1,
                  "first_level"
                ) && "required"
              }
              fullWidth
              name="worldList"
              onChange={(e) => handleChange(e, index, type._id, wordIndex)}
              type="text"
              variant="outlined"
              label="word"
              defaultValue=""
              onBlur={(e) =>
                handleBlur(e, type?.code, index, formikProps, wordIndex + 1)
              }
            />
          </Grid>
        </React.Fragment>
      ))}
      <Grid item>
        <Button
          className={classes.btn}
          variant="contained"
          onClick={(e) => {
            setWorldList([...worldList, ""]);
            handleAdd();
          }}
        >
          +
        </Button>
      </Grid>
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
