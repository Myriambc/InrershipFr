import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { useFormikContext } from "formik";
import { Grid, Divider } from "@material-ui/core";
import PropTypes from "prop-types";
import builder from "helpers/builder";
import { styled } from "@material-ui/core/styles";
import TextBlock from "./components/textBlock";
import TipBlock from "./components/tipBlock";
import TrueFalseBlock from "./components/trueFalseBlock";
import OneCorrectChoiceBlock from "./components/oneCorrectChoiceBlock";
import PhraseBuilderBlock from "./components/phraseBuilderBlock";
import FillInTheBlanksBlock from "./components/fillInTheBlanksBlock";
import DragAndDropBlock from "./components/dragAndDropBlock";
import ConversationBlock from "./components/conversationBlock";
import FileBlock from "./components/fileBlock";
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
const QuestionBlockForm = (props) => {
  const formikProps = useFormikContext();
  const {
    setAlertMessage,
    setTypes,
    types,
    className,
    edit,
    questionId,
    ...rest
  } = props;
  const classes = useStyles();
  const [values, setValues] = useState([]);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    setUpdated(false);
  }, [types]);

  useEffect(() => {
    if (!updated) {
      builder(types, setValues, formikProps);
    }
  }, [types]);

  //remove item
  const onRemove = (id, itemIndex) => {
    setTypes(() => types.filter((el) => el.id !== id));
    setValues(() => values.filter((el, index) => index !== itemIndex));
    setUpdated((previous) => !previous);
  };

  // console.log(values);

  useEffect(() => {
    // if (!questionId) {
    formikProps.setFieldValue("questionBlocks", values);
    // }
  }, [values]);

  return (
    <div>
      {types?.map((type, index) => (
        <Grid container spacing={3} key={type.id}>
          {(type.label === "descriptionBlock" ||
            type.label === "titleBlock" ||
            type.label === "textBlock") && (
            <TextBlock
              label={
                type.label === "descriptionBlock"
                  ? "Description"
                  : type.label === "textBlock"
                  ? "Text"
                  : "Title"
              }
              values={values}
              onRemove={onRemove}
              questionId={questionId}
              type={type}
              types={types}
              index={index}
              setTypes={setTypes}
              setValues={setValues}
            />
          )}

          {type.label === "tipBlock" && (
            <TipBlock
              values={values}
              onRemove={onRemove}
              questionId={questionId}
              type={type}
              types={types}
              index={index}
              setTypes={setTypes}
              setValues={setValues}
              classes={classes}
            />
          )}
          {type.label === "trueFalseBlock" && (
            <TrueFalseBlock
              values={values}
              onRemove={onRemove}
              questionId={questionId}
              type={type}
              types={types}
              index={index}
              setTypes={setTypes}
              setValues={setValues}
              classes={classes}
            />
          )}
          {(type.label === "imageBlock" || type.label === "audioBlock") && (
            <FileBlock
              values={values}
              onRemove={onRemove}
              questionId={questionId}
              type={type}
              types={types}
              index={index}
              setTypes={setTypes}
              setValues={setValues}
              classes={classes}
              code={type.code}
            />
          )}
          {type.label === "oneCorrectChoice" && (
            <OneCorrectChoiceBlock
              values={values}
              onRemove={onRemove}
              questionId={questionId}
              type={type}
              types={types}
              index={index}
              setTypes={setTypes}
              setValues={setValues}
              classes={classes}
            />
          )}
          {type.label === "phraseBuilder" && (
            <PhraseBuilderBlock
              values={values}
              onRemove={onRemove}
              questionId={questionId}
              type={type}
              types={types}
              index={index}
              setTypes={setTypes}
              setValues={setValues}
              classes={classes}
            />
          )}
          {(type.label === "fillInTheBlanks" ||
            type.label === "writeInTheBlanks") && (
            <FillInTheBlanksBlock
              values={values}
              onRemove={onRemove}
              questionId={questionId}
              type={type}
              types={types}
              index={index}
              setTypes={setTypes}
              setValues={setValues}
              classes={classes}
            />
          )}
          {type.label === "dragAndDrop" && (
            <DragAndDropBlock
              values={values}
              onRemove={onRemove}
              questionId={questionId}
              type={type}
              types={types}
              index={index}
              setTypes={setTypes}
              setValues={setValues}
              classes={classes}
            />
          )}
          {(type.label === "conversationBlock" ||
            type.label === "secondDialogBlock" ||
            type.label === "dialogBuilderBlock") && (
            <ConversationBlock
              values={values}
              onRemove={onRemove}
              questionId={questionId}
              type={type}
              types={types}
              index={index}
              setTypes={setTypes}
              setValues={setValues}
              classes={classes}
              code={type.code}
            />
          )}
          {type.label === "matchPairBlock" && (
            <>
              <Grid item md={6} xs={8} spacing={3}>
                not yet completed
              </Grid>
            </>
          )}
        </Grid>
      ))}
    </div>
  );
};
QuestionBlockForm.propTypes = {
  className: PropTypes.string,
  edit: PropTypes.bool,
  handleCloseLoading: PropTypes.func,
  loading: PropTypes.bool,
};
export default QuestionBlockForm;
