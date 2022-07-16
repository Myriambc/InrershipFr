/* -- Methods --------------------- */
const getItemFromStorage = (value) => {
  return localStorage.getItem(value);
};
const setItemFromStorage = (key, value) => {
  return localStorage.setItem(key, value);
};
const removeItemFromStorage = (value) => {
  return localStorage.removeItem(value);
};
const removeAllFromStorage = () => {
  return localStorage.clear();
};
const isAuth = () => {
  return localStorage.getItem("token") !== null;
};
/* -- Export methods --------------------- */
export {
  getItemFromStorage,
  setItemFromStorage,
  removeItemFromStorage,
  removeAllFromStorage,
  isAuth,
};
