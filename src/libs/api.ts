import axios from "axios";

const callApiUrl = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
});

callApiUrl.interceptors.response.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

callApiUrl.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default callApiUrl;
