import React, { useEffect, useState } from "react";
import { getOneQuestion } from "../../../redux/slices/questions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Grid, TextField } from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import { makeStyles } from "@material-ui/styles";
import { styled } from "@material-ui/core/styles";
import FieldSet from "components/FieldSet";
import str2bool from "helpers/str2bool";
import PersonForm from "components/PersonForm";

import builderOnUpdate from "../../../helpers/builderOnUpdate";

const useStyles = makeStyles((theme) => ({
  root: {},
  btnUpload: {
    height: "50px",
    border: "1px solid #c4c4c4",
  },
  btn: {
    marginTop: "4px",
  },
}));
const Input = styled("input")({
  display: "none",
});

function QuestionBlockEdit(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [values, setValues] = useState([]);
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    dispatch(getOneQuestion(id));
  }, [dispatch, id]);

  const { question } = useSelector((state) => state.questions);
  const { loading } = useSelector((state) => state.questions);

  useEffect(() => {
    setValues([]);
    builderOnUpdate(question?.questionBlocks, setValues, setPersons, persons);
  }, [question]);

  const getName = (id) => {
    const person = persons.find((p) => p.id === id);
    return person?.name;
  };

  //handleChange
  const handleChange1 = (event, index, id, wordIndex, key, I) => {
    const fieldValues = [...values];
    switch (event.target.name) {
      case "file":
        fieldValues[index][key] = event.target.files[0];
        break;
      case "answer":
        const booleanValue = str2bool(event.target.value);
        fieldValues[index][event.target.name] = booleanValue;
        break;
      case "answers":
      case "sentences":
      case "words":
      case "questions":
      case "speeches2":
      case "speeches3":
        let arr = [...fieldValues[index][event.target.name]];
        arr[wordIndex] = { ...arr[wordIndex], content: event.target.value };
        fieldValues[index][event.target.name] = arr;
        break;
      case "isBoolean":
        let arr1 = [...fieldValues[index][key]];
        arr1[wordIndex] = {
          ...arr1[wordIndex],
          isHidden: str2bool(event.target.value),
        };
        fieldValues[index][key] = arr1;
        break;
      case "wordList":
        let arr3 = [...fieldValues[index].wordList];
        arr3[wordIndex] = event.target.value;
        fieldValues[index].wordList = arr3;
        break;
      case "audioConversation":
        let arr4 = [...fieldValues[index].speeches];
        arr4[wordIndex] = {
          ...arr4[wordIndex],
          audioUrl: event.target.files[0],
        };
        fieldValues[index].speeches = arr4;
        break;
      case "textConversation":
        let arr5 = [...fieldValues[index].speeches];
        let newWords = [...arr5[wordIndex].words];
        newWords[key] = { ...newWords[key], content: event.target.value };
        arr5[wordIndex] = { ...arr5[wordIndex], words: [...newWords] };
        fieldValues[index].speeches = arr5;
        break;
      case "isHiddenConversation":
        let arr6 = [...fieldValues[index].speeches];
        let newWords1 = [...arr6[wordIndex].words];
        newWords1[key] = {
          ...newWords1[key],
          isHidden: str2bool(event.target.value),
        };
        arr6[wordIndex] = { ...arr6[wordIndex], words: [...newWords1] };
        fieldValues[index].speeches = arr6;
        break;
      default:
        fieldValues[index][event.target.name] = event.target.value;
        break;
    }
    setValues(fieldValues);
  };

  return (
    <>
      {loading == "loading" ? (
        <h2 style={{ margin: "20px" }}>loading...</h2>
      ) : (
        <Grid container spacing={3}>
          {question?.questionBlocks?.map((el, index) => {
            switch (el?.questionBlockTypeId?.code) {
              case 1:
                return (
                  <FieldSet
                    title="Tip Block"
                    key={index}
                    index={index}
                    obj={values[index]}
                    id={el._id}
                    questionId={id}
                  >
                    <Grid item md={6} sm={12} xs={12}>
                      <TextField
                        fullWidth
                        name="text1"
                        onChange={(e) => handleChange1(e, index, el._id)}
                        type="text"
                        variant="outlined"
                        label="text1"
                        defaultValue={el.text1}
                      />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                      <TextField
                        fullWidth
                        name="text2"
                        onChange={(e) => handleChange1(e, index, el._id)}
                        type="text"
                        variant="outlined"
                        label="text2"
                        defaultValue={el.text2}
                      />
                    </Grid>
                    {el?.wordList?.map((word, wordIndex) => (
                      <Grid item md={6} key={wordIndex} sm={12} xs={12}>
                        <TextField
                          fullWidth
                          name="wordList"
                          onChange={(e) =>
                            handleChange1(e, index, el._id, wordIndex)
                          }
                          type="text"
                          variant="outlined"
                          label="word"
                          defaultValue={word}
                        />
                      </Grid>
                    ))}
                  </FieldSet>
                );
              case 2:
              case 5:
              case 6:
                return (
                  <FieldSet
                    title={
                      el?.questionBlockTypeId?.code === 2
                        ? "Title Block"
                        : el?.questionBlockTypeId?.code === 5
                        ? "Text Block"
                        : "Description Block"
                    }
                    key={index}
                    index={index}
                    obj={values[index]}
                    id={el._id}
                    questionId={id}
                  >
                    <Grid item md={12} xs={12}>
                      <TextField
                        fullWidth
                        name="text1"
                        onChange={(e) => handleChange1(e, index, el._id)}
                        type="text"
                        variant="outlined"
                        label="Text"
                        defaultValue={el.text1}
                      />
                    </Grid>
                  </FieldSet>
                );
              case 3:
                return (
                  <FieldSet
                    title="Image Block"
                    key={index}
                    index={index}
                    imageUrl={el?.imageUrl}
                    obj={values[index]}
                    id={el._id}
                    questionId={id}
                  >
                    <Grid item md={12} xs={12}>
                      <TextField
                        fullWidth
                        name="file"
                        onChange={(e) =>
                          handleChange1(e, index, el._id, 0, "imageUrl")
                        }
                        type="file"
                        variant="outlined"
                        defaultValue=""
                      />
                    </Grid>
                  </FieldSet>
                );
              case 4:
                return (
                  <FieldSet
                    title="Audio Block"
                    key={index}
                    index
                    audioUrl={el.audioUrl}
                    obj={values[index]}
                    id={el._id}
                    questionId={id}
                  >
                    <Grid item xs={12}>
                      <label htmlFor="contained-button-file">
                        <Input
                          accept="audio/*"
                          name="file"
                          id="contained-button-file"
                          multiple
                          type="file"
                          onChange={(e) =>
                            handleChange1(e, index, el._id, 0, "audioUrl")
                          }
                          variant="outlined"
                          defaultValue=""
                        />
                        <Button
                          variant="outlined"
                          className={classes.btnUpload}
                          component="span"
                          fullWidth
                        >
                          Update Audio
                        </Button>
                      </label>
                    </Grid>
                  </FieldSet>
                );
              case 7:
                return (
                  <FieldSet
                    key={index}
                    title="True-False Block"
                    index={index}
                    obj={values[index]}
                    id={el._id}
                    questionId={id}
                  >
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        name="text1"
                        onChange={(e) => handleChange1(e, index, el._id)}
                        type="text"
                        variant="outlined"
                        label="question"
                        defaultValue={el.text1}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        name="text2"
                        onChange={(e) => handleChange1(e, index, el._id)}
                        type="text"
                        variant="outlined"
                        label="answer"
                        defaultValue={el.text2}
                      />
                    </Grid>
                    <RadioGroup
                      row
                      name="answer"
                      onChange={(e) => handleChange1(e, index, el._id)}
                      defaultValue={el.answer.toString()}
                    >
                      <FormControlLabel
                        value="true"
                        control={<Radio />}
                        label="True"
                      />
                      <FormControlLabel
                        value="false"
                        control={<Radio />}
                        label="False"
                      />
                    </RadioGroup>
                  </FieldSet>
                );
              case 8:
                return (
                  <FieldSet
                    title="One Correct Choice Block"
                    key={index}
                    index={index}
                    obj={values[index]}
                    id={el._id}
                    questionId={id}
                  >
                    {el?.answers.map((answer, anserIndex) => (
                      <Grid item key={anserIndex} md={6} xs={12}>
                        <TextField
                          fullWidth
                          name="answers"
                          onChange={(e) =>
                            handleChange1(e, index, el._id, anserIndex)
                          }
                          type="text"
                          variant="outlined"
                          label="Answer"
                          defaultValue={answer?.content}
                        />
                        <input
                          type="checkbox"
                          id="correctAnswerId"
                          name="correctAnswerId"
                          onChange={(e) => handleChange1(e, index, el._id)}
                          value={anserIndex}
                          defaultChecked={el?.correctAnswerId === answer.id}
                        ></input>
                      </Grid>
                    ))}
                  </FieldSet>
                );
              case 9:
                return (
                  <FieldSet
                    key={index}
                    title="Phrase builder Block"
                    index={index}
                    obj={values[index]}
                    id={el._id}
                    questionId={id}
                  >
                    {el.sentences.map((sentense, Index) => {
                      return (
                        <Grid key={Index} item md={6} xs={12}>
                          <TextField
                            fullWidth
                            name="sentences"
                            onChange={(e) =>
                              handleChange1(e, index, el._id, Index)
                            }
                            type="text"
                            variant="outlined"
                            label="Sentense"
                            defaultValue={sentense?.content}
                          />
                        </Grid>
                      );
                    })}
                  </FieldSet>
                );
              case 10:
                return (
                  <FieldSet
                    title="Drag And Drop Block"
                    key={index}
                    index={index}
                    obj={values[index]}
                    id={el._id}
                    questionId={id}
                    isUpdate="true"
                  >
                    {el?.questions?.map((quest, i) => {
                      return (
                        <>
                          <Grid key={i} item xs={12} md={6}>
                            <TextField
                              fullWidth
                              name="questions"
                              onChange={(e) =>
                                handleChange1(e, index, el._id, i)
                              }
                              type="text"
                              variant="outlined"
                              label="question"
                              defaultValue={quest?.content}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              fullWidth
                              name="answers"
                              onChange={(e) =>
                                handleChange1(e, index, el._id, i)
                              }
                              type="text"
                              variant="outlined"
                              label="answer"
                              defaultValue={el?.answers[i]?.content}
                            />
                          </Grid>
                        </>
                      );
                    })}
                  </FieldSet>
                );
              case 11:
              case 12:
                return (
                  <FieldSet
                    title="fill In The Blanks Block"
                    key={index}
                    index={index}
                    obj={values[index]}
                    id={el._id}
                    questionId={id}
                  >
                    {el?.words.map((el, Index) => {
                      return (
                        <>
                          <Grid key={Index} item md={8} sm={12} xs={12}>
                            <TextField
                              fullWidth
                              name="words"
                              onChange={(e) =>
                                handleChange1(e, index, el._id, Index)
                              }
                              type="text"
                              variant="outlined"
                              label="Word"
                              defaultValue={el?.content}
                            />
                          </Grid>
                          <RadioGroup
                            row
                            name="isBoolean"
                            onChange={(e) =>
                              handleChange1(e, index, el._id, Index, "words")
                            }
                            defaultValue={el?.isHidden.toString()}
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
                        </>
                      );
                      // }
                    })}
                  </FieldSet>
                );
              case 13:
                return (
                  <FieldSet
                    title="conversation block"
                    key={index}
                    index={index}
                    obj={values[index]}
                    id={el._id}
                    questionId={id}
                    isUpdateConv="true"
                  >
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="text1"
                        onChange={(e) => handleChange1(e, index, el._id)}
                        type="text"
                        variant="outlined"
                        label="title conversation"
                        defaultValue={el?.text1}
                      />
                    </Grid>
                    {el?.speeches?.map((speech, indexS) => (
                      <FieldSet title={getName(speech.personId)} index={indexS}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            name="audioConversation"
                            onChange={(e) => {
                              handleChange1(e, index, el._id, indexS);
                            }}
                            type="file"
                            variant="outlined"
                            defaultValue=""
                            inputProps={{ accept: "audio/*" }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <audio
                            controls
                            style={{ width: "100%" }}
                            className={classes.audio}
                          >
                            <source src={speech?.audioUrl} type="audio/ogg" />
                          </audio>
                        </Grid>
                        {speech?.words?.map((word, I) => (
                          <>
                            <Grid key={I} item xs={12} sm={12} md={12} lg={6}>
                              <TextField
                                fullWidth
                                name="textConversation"
                                onChange={(e) =>
                                  handleChange1(e, index, el._id, indexS, I)
                                }
                                type="text"
                                variant="outlined"
                                label="text"
                                defaultValue={word?.content}
                              />
                            </Grid>
                            <RadioGroup
                              row
                              name="isHiddenConversation"
                              onChange={(e) =>
                                handleChange1(e, index, el._id, indexS, I)
                              }
                              defaultValue={word?.isHidden?.toString()}
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
                          </>
                        ))}
                      </FieldSet>
                    ))}
                  </FieldSet>
                );
              case 14:
                return (
                  <FieldSet
                    title="second dialog block"
                    key={index}
                    index={index}
                    obj={values[index]}
                    id={el._id}
                    questionId={id}
                    isUpdateConv="true"
                  >
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="text1"
                        onChange={(e) => handleChange1(e, index, el._id)}
                        type="text"
                        variant="outlined"
                        label="title conversation"
                        defaultValue={el?.text1}
                      />
                    </Grid>
                    {el?.speeches2.map((speech, indexS) => (
                      <FieldSet title={getName(speech.personId)} index={indexS}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            name="speeches2"
                            onChange={(e) =>
                              handleChange1(e, index, el._id, indexS)
                            }
                            type="text"
                            variant="outlined"
                            label="text"
                            defaultValue={speech?.content}
                          />
                        </Grid>
                        <RadioGroup
                          row
                          name="isBoolean"
                          onChange={(e) =>
                            handleChange1(e, index, el._id, indexS, "speeches2")
                          }
                          defaultValue={speech?.isHidden?.toString()}
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
                      </FieldSet>
                    ))}
                  </FieldSet>
                );
              case 15:
                return (
                  <FieldSet
                    title="dialog builder block"
                    key={index}
                    index={index}
                    obj={values[index]}
                    id={el._id}
                    questionId={id}
                    isUpdateConv="true"
                  >
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="text1"
                        onChange={(e) => handleChange1(e, index, el._id)}
                        type="text"
                        variant="outlined"
                        label="title conversation"
                        defaultValue={el?.text1}
                      />
                    </Grid>
                    {el?.speeches3.map((speech, indexS) => (
                      <FieldSet title={getName(speech.personId)} index={indexS}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            name="speeches3"
                            onChange={(e) =>
                              handleChange1(e, index, el._id, indexS)
                            }
                            type="text"
                            variant="outlined"
                            label="text"
                            defaultValue={speech?.content}
                          />
                        </Grid>
                      </FieldSet>
                    ))}
                  </FieldSet>
                );
            }
          })}
        </Grid>
      )}
    </>
  );
}

export default QuestionBlockEdit;
