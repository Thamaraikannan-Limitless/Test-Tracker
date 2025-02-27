import axios from "axios";
const api = axios.create({
  baseURL:
    "https://lms-dev-apsr-09-hxf6aefxbpgjgxcm.centralindia-01.azurewebsites.net", // API base URL
});

// Attach token to every request **except login && signup**
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // Exclude Authorization header for login && Signup requests
    if (
      token &&
      !config.url.includes("/Auth/login") &&
      !config.url.includes("Auth/register")
    ) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle unauthorized requests (Token Expired)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Session expired. Logging out...");

      // Clear local storage directly
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      // Redirect to login
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;
