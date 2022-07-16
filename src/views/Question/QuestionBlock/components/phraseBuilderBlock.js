import React, { useEffect, useState } from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import { nanoid } from "nanoid";
import BtnAddRemove from "components/BtnAddRemove";
import { useFormikContext } from "formik";
import Divider from "components/Divider/Divider";
import { checkError, handleBlur } from "helpers/checkError";

export default function PhraseBuilderBlock(props) {
  const formikProps = useFormikContext();
  const [sentenses, setSentenses] = useState([{ content: "required" }]);
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
      case "sentences":
        fieldValues[index].sentences[wordIndex] = {
          content: event.target.value,
          position: wordIndex + 1,
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
  const handleAdd = () => {
    setValues((prevData) => {
      prevData[index].sentences = [
        ...prevData[index].sentences,
        { content: "", position: "" },
      ];
      return prevData;
    });
  };

  return (
    <>
      <Divider title={type?.label} />
      {sentenses?.map((el, Index) => {
        return (
          <React.Fragment key={Index}>
            <Grid key={Index} item md={3} sm={6} xs={12}>
              <TextField
                error={Boolean(
                  checkError(
                    "sentences",
                    type?.code,
                    index,
                    formikProps,
                    Index + 1,
                    "first_level"
                  )
                )}
                helperText={
                  checkError(
                    "sentences",
                    type?.code,
                    index,
                    formikProps,
                    Index + 1,
                    "first_level"
                  ) && "required"
                }
                fullWidth
                name="sentences"
                onChange={(e) => handleChange(e, index, type._id, Index)}
                type="text"
                variant="outlined"
                label="Sentense"
                defaultValue=""
                onBlur={(e) =>
                  handleBlur(e, type?.code, index, formikProps, Index + 1)
                }
              />
            </Grid>
          </React.Fragment>
        );
      })}
      <Grid item>
        <Button
          className={classes.btn}
          variant="contained"
          onClick={() => {
            setSentenses([...sentenses, { content: "required" }]);
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
