export const validateOnCreate = (values) => {
  const { questionBlocks } = values;
  let errors = {};
  errors.questionBlocks = [];
  for (let i = 0; i < questionBlocks.length; i++) {
    if (questionBlocks[i]) {
      Object.keys(questionBlocks[i]).forEach((item) => {
        if (
          item !== "order" &&
          item !== "questionBlockTypeId" &&
          item !== "position"
        ) {
          //niveau1 STRING
          if (typeof questionBlocks[i][item] === "string") {
            if (questionBlocks[i][item].trim() === "") {
              errors.questionBlocks[i] = {
                ...errors.questionBlocks[i],
                [item]: "required",
              };
            } else {
              errors.questionBlocks[i] = {
                [item]: "valid",
                ...errors.questionBlocks[i],
              };
            }
            //niveau2 ARRAY
          } else if (Array.isArray(questionBlocks[i]?.[item])) {
            if (!errors.questionBlocks[i]) {
              errors.questionBlocks[i] = {};
            }
            if (!errors.questionBlocks[i][item]) {
              errors.questionBlocks[i][item] = [];
            }
            for (let j = 0; j < questionBlocks[i][item].length; j++) {
              //check if it is an object
              if (typeof questionBlocks[i][item][j] === "object") {
                Object.keys(questionBlocks[i][item][j]).forEach((key) => {
                  if (typeof questionBlocks[i][item][j][key] === "string") {
                    if (questionBlocks[i][item][j][key].trim() === "") {
                      errors.questionBlocks[i][item][j] = {
                        ...errors.questionBlocks[i][item][j],
                        [key]: "required",
                      };
                    } else {
                      errors.questionBlocks[i][item][j] = {
                        [key]: "valid",
                        ...errors.questionBlocks[i][item][j],
                      };
                    }
                    //niveau3 => speaches
                  } else if (Array.isArray(questionBlocks[i][item][j][key])) {
                    if (!errors.questionBlocks[i]) {
                      errors.questionBlocks[i] = {};
                    }
                    if (!errors.questionBlocks[i][item]) {
                      errors.questionBlocks[i][item] = [];
                    }
                    if (!errors.questionBlocks[i][item][j]) {
                      errors.questionBlocks[i][item][j] = {};
                    }
                    if (!errors.questionBlocks[i][item][j][key]) {
                      errors.questionBlocks[i][item][j][key] = [];
                    }
                    for (
                      let k = 0;
                      k < questionBlocks[i][item][j][key].length;
                      k++
                    ) {
                      Object.keys(questionBlocks[i][item][j][key]).forEach(
                        (el) => {
                          if (
                            questionBlocks[i][item][j][key][k].content === ""
                          ) {
                            errors.questionBlocks[i][item][j][key][k] = {
                              ...errors.questionBlocks[i][item][j][key][k],
                              content: "required",
                            };
                          } else {
                            errors.questionBlocks[i][item][j][key][k] = {
                              content: "valid",
                              ...errors.questionBlocks[i][item][j][key][k],
                            };
                          }
                        }
                      );
                    }
                  }
                });
                //worldList ==> tipBlock
              } else if (typeof questionBlocks[i][item][j] === "string") {
                if (questionBlocks[i][item][j].trim() === "") {
                  errors.questionBlocks[i][item][j] = "required";
                } else {
                  errors.questionBlocks[i][item][j] = "valid";
                }
              }
            }
          }
        }
      });
    }
  }
  // clean up the errros if all form is valid
  var isValid = true;
  for (let i = 0; i < errors?.questionBlocks.length; i++) {
    if (isValid === true && typeof errors.questionBlocks[i] === "object") {
      Object.keys(errors?.questionBlocks[i]).forEach((item) => {
        //clean up niveau 1
        if (typeof errors.questionBlocks[i][item] === "string") {
          if (errors.questionBlocks[i][item] === "valid") {
            isValid = true;
          } else {
            isValid = false;
          }
          //clean up niv 2 && niv 3
        } else if (Array.isArray(questionBlocks[i][item])) {
          if (isValid === true) {
            for (let j = 0; j < errors.questionBlocks[i][item].length; j++) {
              if (isValid === true) {
                //if it is string ===> wordList - tip block
                if (typeof errors.questionBlocks[i][item][j] === "string") {
                  if (errors.questionBlocks[i][item][j] === "valid") {
                    isValid = true;
                  } else isValid = false;
                } else {
                  Object.keys(errors.questionBlocks[i][item][j]).forEach(
                    (key) => {
                      if (errors.questionBlocks[i][item][j][key] === "valid") {
                        isValid = true;
                        //niv 3
                      } else if (
                        Array.isArray(questionBlocks[i][item][j][key])
                      ) {
                        if (isValid === true) {
                          for (
                            let index = 0;
                            index <
                            errors.questionBlocks[i][item][j][key].length;
                            index++
                          ) {
                            Object.keys(
                              errors.questionBlocks[i][item][j][key][index]
                            ).forEach((el) => {
                              if (
                                errors.questionBlocks[i][item][j][key][index][
                                  el
                                ] === "valid"
                              ) {
                                isValid = true;
                              } else isValid = false;
                            });
                          }
                        }
                      } else isValid = false;
                    }
                  );
                }
              }
            }
          }
        }
      });
    }
  }
  if (isValid === true) {
    errors = {};
    return errors;
  }
  return errors;
};
