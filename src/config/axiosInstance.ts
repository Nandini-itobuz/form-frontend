import axios from "axios";

export const ApplicationClient = axios.create({
  baseURL: "http://localhost:4000/",
  headers: {
    "Content-Type": "application/json",
    timeout: 8000,
  },
});
