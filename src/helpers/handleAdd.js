export const handleAdd = (setValues, index, item, obj) => {
  setValues((prevData) => {
    prevData[index][item] = [...prevData[index][item], obj];
    return prevData;
  });
};
