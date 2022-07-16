import React from "react";
import { Grid, TextField } from "@material-ui/core";
import { nanoid } from "nanoid";
import BtnAddRemove from "components/BtnAddRemove";
import { useFormikContext } from "formik";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import str2bool from "helpers/str2bool";
import Divider from "components/Divider/Divider";
import { checkError, handleBlur } from "helpers/checkError";

export default function TrueFalseBlock(props) {
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
      case "answer":
        const booleanValue = str2bool(event.target.value);
        fieldValues[index][event.target.name] = booleanValue;
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
      <Grid item xs={12} md={3}>
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
          label="question"
          defaultValue=""
          onBlur={(e) => handleBlur(e, type?.code, index, formikProps)}
        />
      </Grid>
      <Grid item md={3} xs={12}>
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
          label="answer"
          defaultValue=""
          onBlur={(e) => handleBlur(e, type?.code, index, formikProps)}
        />
      </Grid>
      <RadioGroup
        row
        name="answer"
        onChange={(e) => handleChange(e, index, type._id)}
      >
        <FormControlLabel value="true" control={<Radio />} label="True" />
        <FormControlLabel value="false" control={<Radio />} label="False" />
      </RadioGroup>
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