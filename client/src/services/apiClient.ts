import axios from "axios";
import { getAuth } from "firebase/auth";

const apiClient = axios.create({
  baseURL: import.meta.env.DEV
    ? "http://localhost:3001"
    : import.meta.env.VITE_API_URL,
});

apiClient.interceptors.request.use(
  async (config) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const token = await user.getIdToken();
        config.headers.set("Authorization", `Bearer ${token}`);
      }
    } catch (error) {
      console.error("Error getting Firebase token:", error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized request - token might be expired");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
