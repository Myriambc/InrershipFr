import React from "react";
import { Grid, TextField } from "@material-ui/core";
import { nanoid } from "nanoid";
import BtnAddRemove from "components/BtnAddRemove";
import { useFormikContext } from "formik";
import Divider from "components/Divider/Divider";
import { checkError, handleBlur } from "helpers/checkError";

export default function FileBlock(props) {
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
    code,
  } = props;

  const handleChange = (event, index, id, wordIndex, I) => {
    const fieldValues = [...values];
    fieldValues[index][event.target.name] = event.target.files[0];
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
      <Grid item md={6} xs={8} spacing={3}>
        <TextField
          error={Boolean(
            code === 3
              ? checkError("imageUrl", code, index, formikProps)
              : checkError("audioUrl", code, index, formikProps)
          )}
          helperText={
            code === 3
              ? checkError("imageUrl", code, index, formikProps) && "required"
              : checkError("audioUrl", code, index, formikProps) && "required"
          }
          fullWidth
          id="imgUrl"
          name={code === 3 ? "imageUrl" : "audioUrl"}
          onChange={(e) => handleChange(e, index, type._id)}
          onBlur={(e) => handleBlur(e, code, index, formikProps)}
          type="file"
          variant="outlined"
          defaultValue=""
          inputProps={code === 4 ? { accept: "audio/*" } : { accept: "/*" }}
        />
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
