const isExist = (data, order, itemName, itemId) => {
  if (order) {
    const existOrder = data.find((el) => {
      return el?.order === order; //&& el[itemName]._id == itemId;
    });
    if (existOrder) {
      return true;
    } else {
      return false;
    }
  } else return false;
};

export default isExist;
