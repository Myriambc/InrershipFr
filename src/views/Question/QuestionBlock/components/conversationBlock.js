import React, { useEffect, useState } from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import { nanoid } from "nanoid";
import BtnAddRemove from "components/BtnAddRemove";
import str2bool from "helpers/str2bool";
import { useFormikContext } from "formik";
import PersonForm from "components/PersonForm";
import FieldSet from "components/FieldSet";
import Divider from "components/Divider/Divider";
import { checkError, handleBlur } from "helpers/checkError";
import { handleAdd } from "helpers/handleAdd";

export default function ConversationBlock(props) {
  const formikProps = useFormikContext();
  console.log("ssss", formikProps);
  const [personsSelected, setPersonsSelected] = useState([]);
  const [persons, setPersons] = useState([
    { id: 1, name: "marwen" },
    { id: 2, name: "marwen1" },
  ]);
  const [audioUrl, setAudioUrl] = useState();

  const {
    setValues,
    onRemove,
    index,
    questionId,
    values,
    type,
    classes,
    code,
  } = props;

  const handleChange = (event, index, id, wordIndex, I) => {
    const fieldValues = [...values];
    switch (event.target.name) {
      case "person":
        const person = persons.find((el) => el.id === event.target.value);
        if (!fieldValues[index].persons.includes(person)) {
          fieldValues[index].persons = [...fieldValues[index].persons, person];
        }
        if (code === 13) {
          const newPerson = { ...person, key: nanoid(), words: [""] };
          setPersonsSelected([...personsSelected, newPerson]);
          fieldValues[index].speeches.push({
            personId: newPerson.id,
            position: "",
            audioUrl: "",
            words: [{ content: "" }],
          });
        } else if (code === 14) {
          setPersonsSelected([
            ...personsSelected,
            { ...person, key: nanoid() },
          ]);
          fieldValues[index].speeches2.push({
            personId: person.id,
            position: "",
            content: "",
            isHidden: false,
          });
        } else {
          setPersonsSelected([
            ...personsSelected,
            { ...person, key: nanoid() },
          ]);
          fieldValues[index].speeches3.push({
            personId: person.id,
            position: "",
            content: "",
          });
        }
        break;
      case "textConversation":
        let prevData = fieldValues[index].speeches[wordIndex].words[I];
        fieldValues[index].speeches[wordIndex].words[I] = {
          ...prevData,
          content: event.target.value,
          position: I + 1,
          isHidden: prevData?.isHidden ? prevData.isHidden : false,
        };
        break;
      case "isHiddenConversation":
        let prevData1 = fieldValues[index].speeches[wordIndex].words[I];
        fieldValues[index].speeches[wordIndex].words[I] = {
          ...prevData1,
          isHidden: str2bool(event.target.value),
        };
        break;
      case "audioConversation":
        setAudioUrl(event.target.value);
        fieldValues[index].speeches[wordIndex].audioUrl = event.target.files[0];
        fieldValues[index].speeches[wordIndex].position = wordIndex + 1;

        break;
      case "textConversation1":
        if (code === 14) {
          fieldValues[index].speeches2[wordIndex].content = event.target.value;
          fieldValues[index].speeches2[wordIndex].position = wordIndex + 1;
        } else {
          fieldValues[index].speeches3[wordIndex].content = event.target.value;
          fieldValues[index].speeches3[wordIndex].position = wordIndex + 1;
        }
        break;
      case "isHiddenConversation1":
        fieldValues[index].speeches2[wordIndex].isHidden = str2bool(
          event.target.value
        );
        break;
      default:
        if (event.target.files) {
          fieldValues[index][event.target.name] = event.target.files[0];
        } else {
          fieldValues[index][event.target.name] = event.target.value;
        }
        break;
    }
    fieldValues[index]["questionBlockTypeId"] = id;
    if (!questionId) {
      fieldValues[index]["order"] = index + 1;
      formikProps.setFieldValue("questionBlocks", values);
    }
    setValues(fieldValues);
  };
  const handleAdd = (index, item) => {
    setValues((prevData) => {
      prevData[index].speeches[item].words = [
        ...prevData[index].speeches[item].words,
        { content: "" },
      ];
      return prevData;
    });
  };
  return (
    <>
      <Divider title={type?.label} />
      <PersonForm
        classes={classes}
        handleChange={handleChange}
        index={index}
        type={type._id}
        persons={persons}
        setPersons={setPersons}
      />
      {persons.length >= 2 && (
        <>
          <Grid item xs={6} spacing={3}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="personId">Persons</InputLabel>
              <Select
                labelId="personId"
                id="personId"
                name="person"
                label="personId"
                onChange={(e) => handleChange(e, index, type._id)}
                defaultValue=""
              >
                {persons.map((el, index) => (
                  <MenuItem key={index} value={el.id}>
                    {el.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <TextField
              error={Boolean(
                checkError("text1", type.code, index, formikProps)
              )}
              helperText={
                checkError("text1", type.code, index, formikProps) && "required"
              }
              fullWidth
              name="text1"
              onChange={(e) => handleChange(e, index, type._id)}
              type="text"
              variant="outlined"
              label="title conversation"
              defaultValue=""
              onBlur={(e) => handleBlur(e, type?.code, index, formikProps)}
            />
          </Grid>
        </>
      )}
      <Grid item container spacing={3}>
        {personsSelected?.map((el, i) => (
          <React.Fragment key={el.key}>
            <FieldSet
              title={el.name}
              index={index}
              internIndex={i}
              isCreate="true"
              setValues={setValues}
              setPersonsSelected={setPersonsSelected}
              person={el}
              data={values}
              code={code}
            >
              {code === 13 && (
                <>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      error={Boolean(
                        checkError(
                          "speeches",
                          type?.code,
                          index,
                          formikProps,
                          i + 1,
                          "first_level"
                        )
                      )}
                      helperText={
                        checkError(
                          "speeches",
                          type?.code,
                          index,
                          formikProps,
                          i + 1,
                          "first_level"
                        ) && "required"
                      }
                      fullWidth
                      name="audioConversation"
                      onChange={(e) => {
                        handleChange(e, index, type._id, i);
                      }}
                      type="file"
                      variant="outlined"
                      defaultValue=""
                      inputProps={{ accept: "audio/*" }}
                      onBlur={(e) =>
                        handleBlur(e, type?.code, index, formikProps)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <audio
                      controls
                      style={{ width: "100%" }}
                      className={classes.audio}
                    >
                      <source src={audioUrl} type="audio/ogg" />
                    </audio>
                  </Grid>
                </>
              )}
              {code === 14 || code === 15 ? (
                <>
                  <Grid item xs={12} sm={12} md={12} lg={6}>
                    <TextField
                      error={Boolean(
                        code === 14
                          ? checkError(
                              "speeches2",
                              type?.code,
                              index,
                              formikProps,
                              i + 1,
                              "first_level"
                            )
                          : checkError(
                              "speeches3",
                              type?.code,
                              index,
                              formikProps,
                              i + 1,
                              "first_level"
                            )
                      )}
                      helperText={
                        code === 14
                          ? checkError(
                              "speeches2",
                              type?.code,
                              index,
                              formikProps,
                              i + 1,
                              "first_level"
                            ) && "required"
                          : checkError(
                              "speeches3",
                              type?.code,
                              index,
                              formikProps,
                              i + 1,
                              "first_level"
                            ) && "required"
                      }
                      fullWidth
                      name="textConversation1"
                      onChange={(e) => handleChange(e, index, type._id, i)}
                      type="text"
                      variant="outlined"
                      label="text"
                      defaultValue=""
                      onBlur={(e) =>
                        handleBlur(e, type?.code, index, formikProps)
                      }
                    />
                  </Grid>
                  {code === 14 && (
                    <RadioGroup
                      row
                      name="isHiddenConversation1"
                      onChange={(e) => handleChange(e, index, type._id, i)}
                      disabled
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
                  )}
                </>
              ) : (
                <>
                  {el?.words?.map((word, I) => (
                    <React.Fragment key={I}>
                      <Grid item xs={12} sm={12} md={12} lg={6}>
                        <TextField
                          error={Boolean(
                            checkError(
                              "speeches",
                              type?.code,
                              index,
                              formikProps,
                              i + 1,
                              "third_level",
                              I + 1
                            )
                          )}
                          helperText={
                            checkError(
                              "speeches",
                              type?.code,
                              index,
                              formikProps,
                              i + 1,
                              "third_level",
                              I + 1
                            ) && "required"
                          }
                          fullWidth
                          name="textConversation"
                          onChange={(e) =>
                            handleChange(e, index, type._id, i, I)
                          }
                          type="text"
                          variant="outlined"
                          label="text"
                          defaultValue=""
                          onBlur={(e) =>
                            handleBlur(e, type?.code, index, formikProps, i, I)
                          }
                        />
                      </Grid>
                      <RadioGroup
                        row
                        name="isHiddenConversation"
                        onChange={(e) => handleChange(e, index, type._id, i, I)}
                        disabled
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
                      <Grid item xs={2} spacing={1}>
                        <Button
                          className={classes.btn}
                          variant="contained"
                          onClick={() => {
                            const newPersens = personsSelected.map(
                              (el, indexP) => {
                                if (indexP === i) {
                                  el.words = [...el.words, ""];
                                }
                                return el;
                              }
                            );
                            setPersonsSelected(newPersens);
                            handleAdd(index, i);
                          }}
                        >
                          +
                        </Button>
                      </Grid>
                    </React.Fragment>
                  ))}
                </>
              )}
            </FieldSet>
          </React.Fragment>
        ))}
      </Grid>
      <Grid item xs={12}>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => onRemove(type.id, index)}
        >
          Remove conversation
        </Button>
      </Grid>
    </>
  );
}
