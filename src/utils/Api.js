// /* -- Headers & API_URL ------------------ */
// import headers from "../helpers/headers";
// import headersFormData from "../helpers/headersFormData";
// import mapValuesToFormData from "../helpers/mapValuesToFormData";
// import { setItemFromStorage } from "./Storage";
// import { serialize } from "object-to-formdata";
// import { getItemFromStorage } from "../utils/Storage.js";

// const apiUrl = process.env.REACT_APP_FRONT_USERS_URL;

// const token = getItemFromStorage("token");
// /* -- Default methods -------------------- */
// const api_get = async (base_url) => {
//   return fetch(`${apiUrl}/${base_url}`, {
//     method: "GET",
//     headers,
//   }).then((response) => {
//     return response.json();
//   });
// };

// const api_get_rows = async (base_url) => {
//   return fetch(`${base_url}`, {
//     method: "GET",
//     headers,
//   }).then((response) => {
//     return response.json();
//   });
// };

// const api_post_serialize = async (base_url, data, serialize_it) => {
//   let seriali = serialize_it || false;
//   return fetch(`${apiUrl}/${base_url}`, {
//     method: "POST",
//     /*  headers: {
//       Authorization: headers.Authorization,
//     },*/
//     headers: seriali === true ? headersFormData : headers,
//     body:
//       seriali === true
//         ? serialize(data, { indices: true })
//         : JSON.stringify(data),
//   })
//     .then((response) => response.json())
//     .then((response) => {
//       return response;
//     })
//     .catch((error) => {
//       throw new Error(error);
//     });
// };

// const api_post = async (base_url, data, serialize_it) => {
//   let seriali = serialize_it || false;
//   return fetch(`${apiUrl}/${base_url}`, {
//     method: "POST",
//     /*  headers: {
//       Authorization: headers.Authorization,
//     },*/
//     headers: seriali === true ? headersFormData : headers,
//     body: seriali === true ? mapValuesToFormData(data) : JSON.stringify(data),
//   })
//     .then((response) => response.json())
//     .then((response) => {
//       return response;
//     })
//     .catch((error) => {
//       throw new Error(error);
//     });
// };

// const api_put = async (base_url, data) => {
//   return fetch(`${apiUrl}/${base_url}`, {
//     method: "PUT",
//     headers,
//     body: JSON.stringify(data),
//   }).then((response) => {
//     return response.json();
//   });
// };

// const api_delete = async (base_url) => {
//   return fetch(`${apiUrl}/${base_url}`, {
//     method: "DELETE",
//     headers,
//   }).then((response) => {
//     return response.json();
//   });
// };

// const api_delete_many = async (base_url, data, keyValue, serialize_it) => {
//   let seriali = serialize_it || false;
//   const keyData = { [keyValue]: data };
//   return fetch(`${apiUrl}/${base_url}`, {
//     method: "POST",
//     headers: seriali === true ? headersFormData : headers,
//     body: JSON.stringify(keyData),
//   }).then((response) => {
//     return response.json();
//   });
// };

// // const login = async (credentials) => {
// //   return fetch(`${apiUrl}/admin/auth/login_check`, {
// //     method: "POST",
// //     headers: {
// //       "Content-Type": "application/json",
// //     },
// //     body: JSON.stringify(credentials),
// //   }).then(async (response) => {
// //     const json = await response.json();
// //     if (response.ok) {
// //       await setItemFromStorage("token", json.payload.token);
// //     } else {
// //       throw new Error(json.message);
// //     }
// //   });
// // };

// const get_file = async (base_url) => {
//   fetch(`${apiUrl}/${base_url}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/pdf",
//       Authorization: `Bearer ${token}`,
//     },
//   })
//     .then((response) => response.blob())
//     .then((blob) => {
//       // Create blob link to download
//       const url = window.URL.createObjectURL(new Blob([blob]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", `FileName.csv`);

//       // Append to html link element page
//       document.body.appendChild(link);

//       // Start download
//       link.click();

//       // Clean up and remove the link
//       link.parentNode.removeChild(link);
//     });
// };
// /* -- Export methods --------------------- */
// export {
//   api_get,
//   api_post,
//   api_put,
//   api_delete,
//   api_delete_many,
//   // login,
//   api_post_serialize,
//   get_file,
//   api_get_rows,
// };
