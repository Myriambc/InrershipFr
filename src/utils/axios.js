import axios from "axios";
// const apiUrl = process.env.REACT_APP_API_URL;
console.log("fggt", process.env.REACT_APP_FRONT_USERS_URL);
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_FRONT_USERS_URL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export default axiosInstance;
