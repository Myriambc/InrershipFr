const mapStateToRequest = (
  state,
  toIgnore = [],
  toBoolean = [],
  toObjectKey = [],
  toRemove = []
) => {
  const request = {};

  for (const field in state) {
    let result = null;
    let newArr = [];
    if (toObjectKey.length) {
      result = toObjectKey.find((object) => object.name === field);
    }
    if (state.hasOwnProperty(field)) {
      if (toIgnore.includes(field)) {
        request[field] = state[field];
      } else if (toBoolean.includes(field) && !isNaN(state[field])) {
        request[field] = parseInt(state[field]) === 1 ? true : false;
      } else if (result) {
        state[result.name].map((v) => {
          newArr.push({
            [result.key]: v.id,
          });
        });
        request[field] = newArr;
      } else if (toRemove.includes(field)) {
        continue;
      } else if (state[field] instanceof Array) {
        request[field] = state[field].map((v) => {
          return v.id;
        });
      } else if (state[field] instanceof File) {
        request[field] = state[field];
      } else if (typeof state[field] === "boolean") {
        request[field] = Number(state[field]);
      } else if (state[field] instanceof Object) {
        request[field] = state[field].id;
      } else {
        request[field] = state[field];
      }
    }
  }
  return request;
};

export default mapStateToRequest;
