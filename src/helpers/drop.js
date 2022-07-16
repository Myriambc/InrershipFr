const drop = (result, index, list, setList, setTitleList) => {
  const newItems = [...list[index]];
  if (result?.destination?.index !== undefined) {
    setTitleList((prevData) => {
      const newTitleList = prevData?.map((item, j) => {
        if (j === index) {
          item.isDisabled = false;
        }
        return item;
      });
      setTitleList(newTitleList);
    });
    // setDisabled(false);
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);

    const newList = newItems.map((el, i) => {
      el["newIndex"] = i;
      // el.newOrder = i + 1;
      return el;
    });
    for (let i = 0; i < newItems.length; i++) {
      newItems["newIndex"] = i;
      for (let k = 0; k <= newItems.length; k++) {
        if (newItems[i].newIndex === newItems[k]?.oldIndex) {
          newItems[i].newOrder = newItems[k].oldOrder;
        }
      }
    }
    setList((prevData) => {
      const data = prevData?.map((item, indexV) => {
        if (indexV === index) {
          item = newList;
        }
        return item;
      });
      setList(data);
    });
  }
};

export default drop;
