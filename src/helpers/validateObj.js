const removeKey = (key, { [key]: _, ...rest }) => rest;

const validateObj = (obj, newObj) => {
  for (const [p, val] of Object.entries(newObj)) {
    // if (val !== undefined) {
    if (
      newObj[p] === "" ||
      newObj[p] === obj[p] ||
      newObj[p] === obj[p]?._id ||
      newObj[p] === undefined
    ) {
      const rest = removeKey(p.toString(), newObj);
      newObj = rest;
    }
    // }
  }
  return newObj;
};

export default validateObj;
