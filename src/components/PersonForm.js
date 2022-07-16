import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { nanoid } from "nanoid";
import * as Yup from "yup";

import { Button, Grid, TextField, Box, Container } from "@material-ui/core";

const PersonForm = (props) => {
  const {
    classes,
    persons,
    setPersons,
    person,
    isUpdateConv,
    setValues,
    index,
    data,
  } = props;
  const [avat, setAvatar] = useState("");
  const formik = useFormik({
    initialValues: {
      name: isUpdateConv ? person?.name : "",
      avatar: "",
    },
    validationSchema: !isUpdateConv
      ? Yup.object().shape({
          name: Yup.string().required(),
          avatar: Yup.mixed().required("avatar is required"),
        })
      : "",
    onSubmit: (values) => {
      if (isUpdateConv) {
        setPersons((prevData) => {
          const newPersons = prevData.map((p, i) => {
            if (p.id === person.id) {
              if (values.name) {
                p = { ...p, name: values.name };
              }
              if (values.avatar) {
                p = { ...p, avatar: values.avatar };
              }
            }
            return p;
          });
          setPersons(newPersons);
          // setValues((prevData) => {
          //   const newValue = prevData.map((el, indexV) => {
          //     if (indexV === index) {
          //       el.persons = newPersons;
          //     }
          //     return el;
          //   });
          //   setValues(newValue);
          // });
        });
      } else {
        setPersons([...persons, { ...values, id: nanoid() }]);
        formik.setValues((state) => {
          setAvatar("");
          return { ...state, name: "", avatar: "" };
        });
        formik.setTouched({ ...formik.touched, name: false, avatar: false });
      }
    },
  });

  return (
    <>
      <Grid
        item
        component="form"
        onSubmit={formik.handleSubmit}
        container
        spacing={3}
      >
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            error={Boolean(formik.touched.name && formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            fullWidth
            name="name"
            type="text"
            variant="outlined"
            label="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            error={Boolean(formik.touched.avatar && formik.errors.avatar)}
            helperText={formik.touched.avatar && formik.errors.avatar}
            fullWidth
            name="avatar"
            type="file"
            variant="outlined"
            onChange={(e) => {
              formik.setFieldValue("avatar", e.target.files[0]);
              setAvatar(e.target.value);
            }}
            onBlur={formik.handleBlur}
            value={avat}
            // defaultValue=""
          />
        </Grid>

        <Grid item xs={8} sm={12} md={6} spacing={1}>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Button
              className={classes.btn}
              variant="contained"
              color="primary"
              type="submit"
            >
              {isUpdateConv ? "Update person" : "add person"}
            </Button>
            {persons?.length < 2 && (
              <h4 style={{ fontFamily: "Roboto" }}>
                please add at least 2 persons
              </h4>
            )}
            {isUpdateConv && (
              <img
                style={{ width: "60px", height: "60px", borderRadius: "50%" }}
                src={person?.avatar}
              ></img>
            )}
          </div>
        </Grid>
      </Grid>
    </>
  );
};
export default PersonForm;
