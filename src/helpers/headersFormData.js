import { getItemFromStorage } from "../utils/Storage.js";

const token = getItemFromStorage("token");
const headersFormData = {
    Accept: "application/json",
    //"Content-Type": "multipart/form-data",
    "Accept-Language": "en",
    Authorization: `Bearer ${token}`,
};

export default headersFormData;
