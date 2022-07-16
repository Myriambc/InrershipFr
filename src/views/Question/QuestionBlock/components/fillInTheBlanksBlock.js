import React, { useEffect, useState } from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import { nanoid } from "nanoid";
import BtnAddRemove from "components/BtnAddRemove";
import { useFormikContext } from "formik";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import str2bool from "helpers/str2bool";
import Divider from "components/Divider/Divider";
import { handleAdd } from "helpers/handleAdd";
import { checkError, handleBlur } from "helpers/checkError";
import Checkbox from "@material-ui/core/Checkbox";

export default function FillInTheBlanksBlock(props) {
  const formikProps = useFormikContext();
  const [words, setWords] = useState([{ content: "required" }]);

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
      case "words":
        fieldValues[index].words[wordIndex] = {
          content: event.target.value,
          position: fieldValues[index].words[wordIndex].position
            ? fieldValues[index].words[wordIndex].position
            : wordIndex + 1,
          isHidden: false,
        };
        break;
      case "isExtra":
        let checked = event.target.checked;
        const wordsWithIndex1 = words.filter((el) => el.index === index);
        fieldValues[index].words[
          wordsWithIndex1.length + wordIndex
        ].position = checked ? -1 : wordIndex + 1;
        for (let i = wordIndex + 1; i < fieldValues[index].words.length; i++) {
          if (fieldValues[index].words[i].position !== -1) {
            if (checked === true) {
              fieldValues[index].words[i].position--;
            } else {
              fieldValues[index].words[i].position++;
            }
          }
        }
        break;
      case "isHidden":
        fieldValues[index].words[wordIndex].isHidden = str2bool(
          event.target.value
        );
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
      {words?.map((el, Index) => {
        return (
          <React.Fragment key={Index}>
            <Grid key={Index} item md={6} sm={12} xs={12}>
              <TextField
                error={Boolean(
                  checkError(
                    "words",
                    type?.code,
                    index,
                    formikProps,
                    Index + 1,
                    "first_level"
                  )
                )}
                helperText={
                  checkError(
                    "words",
                    type?.code,
                    index,
                    formikProps,
                    Index + 1,
                    "first_level"
                  ) && "required"
                }
                fullWidth
                name="words"
                onChange={(e) => handleChange(e, index, type._id, Index)}
                type="text"
                variant="outlined"
                label="Word"
                defaultValue=""
                onBlur={(e) =>
                  handleBlur(e, type?.code, index, formikProps, Index + 1)
                }
              />
            </Grid>
            <Grid item md={6} sm={12} xs={12} container>
              <RadioGroup
                row
                name="isHidden"
                onChange={(e) => handleChange(e, index, type._id, Index)}
                defaultValue="false"
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Hidden"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="Not Hidden"
                />
              </RadioGroup>
              <FormControlLabel
                onChange={(e) => handleChange(e, index, type._id, Index)}
                control={<Checkbox />}
                label="Is Extra Word"
                name="isExtra"
              />
              {Index + 1 === words.length && (
                <Grid item>
                  <Button
                    className={classes.btn}
                    variant="contained"
                    onClick={() => {
                      setWords([...words, { content: "required" }]);
                      handleAdd(setValues, index, "words", {
                        content: "",
                        position: words.length + 1,
                        isHidden: false,
                      });
                    }}
                  >
                    + Word
                  </Button>
                </Grid>
              )}
            </Grid>
          </React.Fragment>
        );
      })}

      <BtnAddRemove
        onRemove={() => onRemove(type.id, index)}
        onAdd={() => {
          setTypes([...types, { ...type, id: nanoid() }]);
        }}
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
