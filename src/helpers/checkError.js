export const checkError = (
  item,
  code,
  index,
  formik,
  Index,
  level,
  secondIndex
) => {
  const { errors, touched } = formik;

  //NIV1
  if (!level) {
    if (errors.questionBlocks && touched?.questionBlocks) {
      return (
        errors.questionBlocks[index]?.[item] === "required" &&
        touched?.questionBlocks[index]?.[item]
      );
    } else if (errors.questionBlocks && !touched?.questionBlocks) {
      return (
        errors.questionBlocks[index]?.[item] === "required" &&
        touched[item + index + code]
      );
    }

    //NIV2
  } else if (level === "first_level") {
    if (
      touched?.questionBlocks &&
      !touched[item + index + code + Index] &&
      errors.questionBlocks
    ) {
      if (code === 1) {
        return (
          errors?.questionBlocks[index]?.[item][Index - 1] === "required" &&
          touched?.questionBlocks[index]?.[item][Index - 1]
        );
      } else if (code === 13) {
        //case of conversation block audioBlock field
        return (
          errors?.questionBlocks[index]?.[item][Index - 1]?.audioUrl ===
            "required" &&
          touched?.questionBlocks[index]?.[item][Index - 1]?.audioUrl
        );
        //other case with content field
      } else {
        return (
          errors?.questionBlocks[index]?.[item][Index - 1]?.content ===
            "required" &&
          touched?.questionBlocks[index]?.[item][Index - 1]?.content
        );
      }
    } else if (errors.questionBlocks) {
      // return (
      //   errors?.questionBlocks[index]?.[item][Index - 1]?.content ===
      //     "required" && touched[item + index + code + Index]
      // );
    }
    //NIV 3
  } else if (level === "third_level") {
    if (
      touched?.questionBlocks &&
      !touched[item + index + code + Index + secondIndex] &&
      errors.questionBlocks
    ) {
      return (
        errors?.questionBlocks[index]?.[item][Index - 1]?.words[secondIndex - 1]
          ?.content === "required" &&
        touched?.questionBlocks[index]?.[item][Index - 1]?.words[
          secondIndex - 1
        ]?.content
      );
    } else {
      // return (
      //   errors?.questionBlocks[index]?.[item][Index - 1]?.words[secondIndex]
      //   .content === "required" &&
      //   touched?.questionBlocks[index]?.[item][Index - 1]?.content
      // );
    }
  }
};

export const handleBlur = (e, code, index, formik, secondIndex, thirdIndex) => {
  if (secondIndex) {
    formik.setTouched({
      ...formik.touched,
      [e.target.name + index + code + secondIndex]: true,
    });
  } else if (thirdIndex) {
    formik.setTouched({
      ...formik.touched,
      [e.target.name + index + code + secondIndex + thirdIndex]: true,
    });
  } else {
    formik.setTouched({
      ...formik.touched,
      [e.target.name + index + code]: true,
    });
  }
};

// export const handleBlurOnRemove = (item, code, index, formik, secondIndex) => {
//   if (secondIndex) {
//     formik.setTouched({
//       [item + index + code + secondIndex]: false,
//       ...formik.touched,
//     });
//   } else {
//     formik.setTouched({
//       [item + index + code]: false,
//       ...formik.touched,
//     });
//   }
// };
// } else if (level === "first_level") {
//   console.log("validation here");
//   if (touched?.questionBlocks && !touched[item + index + code + Index]) {
//     return (
//       error["content"] === "required" &&
//       touched?.questionBlocks[index]?.[item][Index - 1]?.content
//     );
//   } else {
//     return (
//       error["content"] === "required" && touched[item + index + code + Index]
//     );
//   }
// }
