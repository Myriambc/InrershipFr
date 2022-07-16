// @flow
import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";

import CKEditor_Index from "./QuillEditor";

const DescriptionField = ({ handleBodyChange, value, values }) => {
  return (
    <CKEditor_Index
      handleChange={handleBodyChange}
      value={value}
      values={values}
    />
  );
};

export default DescriptionField;
