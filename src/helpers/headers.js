import { getItemFromStorage } from "../utils/Storage.js";

const token = getItemFromStorage("token");
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Accept-Language": "en",
  Authorization: `Bearer ${token}`,
};

export default headers;
