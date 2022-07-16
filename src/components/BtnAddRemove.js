import React from "react";
import { Button, Box } from "@material-ui/core";
import validateOnUpdate from "helpers/validateObjOnUpdate";
import { insertQuestionBlock } from "../redux/slices/questionBlocks";
import { useDispatch, useSelector } from "react-redux";
import { getOneQuestion } from "redux/slices/questions";

function BtnAddRemove(props) {
  const dispatch = useDispatch();
  const {
    onAdd,
    onRemove,
    isRemove,
    questionId,
    obj,
    code,
    setTypes,
    id,
    setValues,
    index,
  } = props;
  const { question } = useSelector((state) => state.questions);

  const onSubmit = () => {
    // const validObj = validateOnUpdate(obj, code);
    const newObj = {
      ...obj,
      questionId: questionId,
      order: question?.questionBlocks?.length + 1,
    };
    dispatch(insertQuestionBlock(newObj)).then(() => {
      dispatch(getOneQuestion(questionId));
      setTypes((types) => types.filter((el) => el.id !== id));
      setValues((values) => values.filter((el, i) => i !== index));
    });
  };
  return (
    <div style={{ display: "flex" }}>
      {!isRemove && (
        <Box m={1} pt={1}>
          <Button color="primary" variant="contained" onClick={onAdd}>
            +
          </Button>
        </Box>
      )}
      <Box m={1} pt={1}>
        <Button color="secondary" variant="contained" onClick={onRemove}>
          -
        </Button>
      </Box>
      {questionId && (
        <Box m={1} pt={1}>
          <Button
            variant="contained"
            onClick={() => onSubmit()}
            disabled={obj ? !validateOnUpdate(obj, code) : true}
            color="primary"
          >
            Save
          </Button>
        </Box>
      )}
    </div>
  );
}

export default BtnAddRemove;
