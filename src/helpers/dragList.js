const filterList = (index, list) => {
  let newItem = [];
  let item = list[index];
  for (let i = 0; i < list[index].length; i++) {
    const obj = {
      id: item[i].id,
      oldOrder: item[i].oldOrder,
      newOrder: item[i].newOrder,
    };
    newItem.push(obj);
  }
  const filtredList = newItem.filter((el) => el.newOrder !== el.oldOrder);
  return filtredList;
};

export default filterList;
