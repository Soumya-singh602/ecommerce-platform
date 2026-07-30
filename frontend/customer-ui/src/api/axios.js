import axios from "axios";

console.log(
  "CURRENT API URL:",
  import.meta.env.VITE_API_URL
);


const api = axios.create({

  baseURL: import.meta.env.VITE_API_URL,

  headers: {
    "Content-Type": "application/json",
  },

});



api.interceptors.request.use(

  (config) => {


    const token = localStorage.getItem("access");


    console.log(
      "TOKEN FROM LOCALSTORAGE:",
      token
    );


    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }


    console.log(
      "REQUEST HEADERS:",
      config.headers
    );


    return config;


  },


  (error) => Promise.reject(error)

);



export default api;