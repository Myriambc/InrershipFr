const buildList = (items, setTitleList, setList) => {
  for (let i = 0; i < Object.keys(items).length; i++) {
    const key = Object.keys(items)[i];
    setTitleList((prevData) => {
      let arr = [
        ...prevData,
        { subtitle: items[key][i]?.subtitle, title: key, isDisabled: true },
      ];
      return arr;
    });
    const val = items[key];
    let newVal = [];
    const t = val?.map((el, index) => {
      const obj = {
        id: el._id,
        title: el.title,
        oldOrder: el.order,
        newOrder: el.order,
        oldIndex: index,
      };
      return newVal.push(obj);
    });
    setList((prevData) => {
      let arr = [...prevData, newVal];
      return arr;
    });
  }
};
export default buildList;
