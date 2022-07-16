import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import SimpleToolbar from "../../../components/Toolbar/SimpleToolbar";
import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  Grid,
  CardActions,
  Button,
} from "@material-ui/core";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ListItem } from "../components/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  getGroupedLessons,
  updateLessonOrder,
} from "../../../redux/slices/lessons";
import buildList from "../../../helpers/buildList";
import filterList from "../../../helpers/dragList";
import drop from "../../../helpers/drop";
import { FaGripVertical } from "react-icons/fa";
import SnackBar from "../../../components/SnackBar";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },

  content: {
    marginTop: theme.spacing(2),
  },
  items: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title_item: {
    textAlign: "center",
  },
}));
function LessonOrder() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [message, setAlertMessage] = useState("try to change orders");
  const [severity, setAlertSeverity] = useState("error");
  const [open, setOpen] = React.useState(false);
  const [titleList, setTitleList] = useState([]);
  const [list, setList] = useState([]);
  const { lessonsGrouped, loading } = useSelector((state) => state.lessons);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (lessonsGrouped?.length === 0) {
      dispatch(getGroupedLessons("?grouped=true&sort=-order,title"));
    }
  }, [dispatch]);

  useEffect(() => {
    buildList(lessonsGrouped, setTitleList, setList);
  }, [dispatch, lessonsGrouped]);

  const updateOrders = async (index) => {
    const orders = filterList(index, list);
    await dispatch(updateLessonOrder(orders)).then((response) => {
      if (response.payload.code === 200) {
        setAlertMessage("Order Updated Successfully");
        setAlertSeverity("success");
        handleClick();
        setList([]);
        setTitleList([]);
        dispatch(getGroupedLessons("?grouped=true&sort=-order,title"));
      } else {
        setAlertMessage("Failed");
        setAlertSeverity("error");
        handleClick();
      }
    });
  };
  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={12}>
        <SimpleToolbar title={"Reorder Lessons"} />
      </Grid>
      {loading === "loading" ? (
        <h2>loading...</h2>
      ) : (
        titleList?.map((el, index) => (
          <DragDropContext
            key={index}
            onDragEnd={(param) =>
              drop(param, index, list, setList, setTitleList)
            }
          >
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader
                  title={"Level : " + el.title}
                  subheader={el.subtitle}
                  style={{
                    textAlign: "center",
                  }}
                />

                <Divider />
                <CardContent>
                  <Droppable droppableId={"droppable-1" + index}>
                    {(provided, _) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        {list[index]?.map((item, i) => (
                          <Draggable
                            key={item.id}
                            draggableId={"draggable-" + item.id}
                            index={i}
                          >
                            {(provided, snapshot) => (
                              <ListItem
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                style={{
                                  ...provided.draggableProps.style,
                                  boxShadow: snapshot.isDragging
                                    ? "0 0 .4rem #666"
                                    : "none",

                                  border: snapshot.isDragging
                                    ? "1px solid #3993E2"
                                    : "1px solid #C4C4C4",
                                  marginBottom: "10px",
                                  borderRadius: "5px",
                                  color: snapshot.isDragging
                                    ? "#3993E2"
                                    : "black",
                                }}
                                {...provided.dragHandleProps}
                              >
                                <div className={classes.items}>
                                  <p>{item.newOrder}</p>

                                  <span className={classes.title_item}>
                                    {item.title}
                                  </span>
                                  <FaGripVertical color="#666" />
                                </div>
                              </ListItem>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </CardContent>
                <Divider />

                <CardActions>
                  <Button
                    color="primary"
                    variant="contained"
                    disabled={titleList[index].isDisabled}
                    onClick={() => {
                      updateOrders(index);
                    }}
                  >
                    Save
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </DragDropContext>
        ))
      )}
      <SnackBar
        open={open}
        message={message}
        severity={severity}
        handleClose={handleClose}
      />
    </Grid>
  );
}

export default LessonOrder;
