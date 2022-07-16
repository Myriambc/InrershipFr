import React from "react";
import { Grid, TextField } from "@material-ui/core";
import { nanoid } from "nanoid";
import BtnAddRemove from "components/BtnAddRemove";
import { useFormikContext } from "formik";
import Divider from "../../../../components/Divider/Divider";
import { checkError, handleBlur } from "helpers/checkError";

export default function TextBlock(props) {
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
    label,
  } = props;

  const handleChange = (event, index, id, wordIndex, I) => {
    const fieldValues = [...values];
    fieldValues[index][event.target.name] = event.target.value;
    fieldValues[index]["questionBlockTypeId"] = id;
    if (!questionId) {
      fieldValues[index]["order"] = index + 1;
      // formikProps.setFieldValue("questionBlocks", values);
    }
    setValues(fieldValues);
  };

  return (
    <>
      <Divider title={type?.label} />
      <Grid item md={6} xs={12}>
        <TextField
          required
          fullWidth
          name="text1"
          id="text"
          variant="outlined"
          label={label}
          defaultValue=""
          onChange={(e) => handleChange(e, index, type._id)}
          onBlur={(e) => handleBlur(e, type?.code, index, formikProps)}
          error={Boolean(checkError("text1", type.code, index, formikProps))}
          helperText={
            checkError("text1", type.code, index, formikProps) && "required"
          }
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
