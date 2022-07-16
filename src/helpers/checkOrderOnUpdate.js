const checkOrderOnUpdate = (data, order, itemName, itemId, validOrder) => {
  //check if we don't have any updating in the form
  if (order !== validOrder) {
    const existOrder = data.find((el) => {
      return el.order === order && el[itemName]._id == itemId;
    });
    if (existOrder) {
      return true;
    } else {
      return false;
    }
  } else return false;
};

export default checkOrderOnUpdate;
