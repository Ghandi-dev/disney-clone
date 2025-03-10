import environment from "@/config/environment";
import axios from "axios";

const headers = {
  "Content-Type": "application/json",
};

const instance = axios.create({
  baseURL: environment.API_URL,
  headers,
  timeout: 60 * 1000,
});
// Interceptors response
instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);
// Interceptors request
instance.interceptors.request.use(
  async (request) => {
    request.headers.Authorization = `Bearer ${environment.API_KEY}`;
    return request;
  },
  (error) => Promise.reject(error)
);

export default instance;
