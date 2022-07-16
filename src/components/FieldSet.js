import React, { useState } from "react";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useDispatch } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import SnackBar from "../components/SnackBar";
import Delete from "./Action/Delete";
import { nanoid } from "nanoid";

const useStyles = makeStyles((theme) => ({
  root: {},
  btnUpload: {
    height: "50px",
    border: "1px solid #c4c4c4",
  },
  btn: {
    marginTop: "4px",
  },
  fieldset: {
    padding: "25px",
    margin: "0 0 25px 0",
  },
  audio: {
    height: "35px",
  },
  legend: {},
}));
function FieldSet(props) {
  const {
    title,
    index,
    internIndex,
    audioUrl,
    imageUrl,
    obj,
    id,
    questionId,
    isCreate,
    isUpdateConv,
    setPersonsSelected,
    setValues,
    person,
    data,
    code,
  } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [message, setAlertMessage] = useState("Nothing to update");
  const [severity, setAlertSeverity] = useState("error");

  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    setOpenDelete(!openDelete);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const removeSpeach = () => {
    setPersonsSelected((prevData) =>
      prevData.filter((el, i) => i !== internIndex)
    );
    setValues((prevData) => {
      const newValue = data.map((el, indexV) => {
        if (indexV === index) {
          if (code === 14) {
            el.speeches2.splice(internIndex, 1);
            for (let i = internIndex; i < el.speeches2.length; i++) {
              if (el.speeches2[i].position !== "") {
                el.speeches2[i].position = el.speeches2[i].position - 1;
              }
            }
          } else if (code === 15) {
            el.speeches3.splice(internIndex, 1);
            for (let i = internIndex; i < el.speeches3.length; i++) {
              if (el.speeches3[i].position !== "") {
                el.speeches3[i].position = el.speeches3[i].position - 1;
              }
            }
          } else {
            el.speeches.splice(internIndex, 1);
            for (let i = internIndex; i < el.speeches.length; i++) {
              if (el.speeches[i].position !== "") {
                el.speeches[i].position = el.speeches[i].position - 1;
              }
            }
          }
        }
        return el;
      });
      setValues(newValue);
    });
  };
  const addSpeach = () => {
    setPersonsSelected((prevData) => [
      ...prevData,
      { ...person, words: [""], key: nanoid() },
    ]);
    setValues((prevData) => {
      const newValue = data.map((el, indexV) => {
        if (indexV === index) {
          if (code === 14) {
            el.speeches2.push({
              personId: person.id,
              position: "",
              content: "",
              isHidden: false,
            });
          } else if (code === 15) {
            el.speeches3.push({
              personId: person.id,
              position: "",
              content: "",
            });
          } else {
            el.speeches.push({
              personId: person.id,
              position: "",
              audioUrl: "",
              words: [{ content: "" }],
            });
          }
        }
        return el;
      });
      setValues(newValue);
    });
  };
  return (
    <Grid item xs={12} sm={12} md={isUpdateConv ? 12 : 6}>
      <fieldset className={classes.fieldset}>
        <legend>
          <h4 className={classes.legend}>
            {title} {isCreate ? internIndex + 1 : index + 1}{" "}
          </h4>
        </legend>
        <Grid container spacing={3}>
          {props.children}
          <Grid item spacing={3} container justifyContent="space-between">
            {imageUrl && <img style={{ width: "50px" }} src={imageUrl}></img>}
            {audioUrl && (
              <audio controls className={classes.audio}>
                <source src={audioUrl} type="audio/ogg" />
              </audio>
            )}
            <span></span>
            <div style={{ display: "flex", gap: "10px" }}>
              {obj && (
                <>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={() => handleDelete()}
                  >
                    <DeleteIcon />
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      handleClick();
                    }}
                  >
                    Save
                  </Button>
                </>
              )}
              {isCreate === "true" && (
                <>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => removeSpeach()}
                  >
                    -
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => addSpeach()}
                  >
                    +
                  </Button>
                </>
              )}
            </div>
          </Grid>
        </Grid>
      </fieldset>
      <Delete
        handleDelete={handleDelete}
        open={openDelete}
        handleClose={handleCloseDelete}
        itemId={id}
        questionId={questionId}
      ></Delete>
      <SnackBar
        open={open}
        message={message}
        severity={severity}
        handleClose={handleClose}
      />
    </Grid>
  );
}

export default FieldSet;
