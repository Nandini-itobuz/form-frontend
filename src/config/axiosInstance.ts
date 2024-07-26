import axios from "axios";

export const ApplicationClient = axios.create({
  baseURL: "http://localhost:4000/",
  headers: {
    "Content-Type": "application/json",
    timeout: 8000,
  },
});

ApplicationClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error("Error response:", error.response);
    return Promise.reject(error);
  },
);
