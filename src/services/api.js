import axios from "axios";
const baseURL = process.env.REACT_APP_FRONT_USERS_URL;
const baseURL2 = process.env.REACT_APP_FRONT_USERS_URL_IMAGE;
export const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const api = axios.create({
  baseURL,
  headers,
});
const api2 = axios.create({
  baseURL: baseURL2,
  headers: {
    "Content-Type": "image/jpeg",
  },
});
//request interceptor to add the auth token header to requests
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
api2.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const getData = (url, filter) => api.get(`/${url}${filter}`);
export const getOne = (url, id) => api.get(`/${url}/${id}`);
export const updateOne = (url, id, item) => api.put(`/${url}/${id}`, item);
export const createOne = (url, data) => api.post(`/${url}`, data);
export const deleteOne = (url, id) => api.delete(`/${url}/${id}`);
export const getImage = (url) => api2.get(`/${url}`);
export default api;
