import { create } from "zustand";
import api from "../API/AxiosInterceptor";

const useLoginAuthStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  isLoading: true, // Start with loading state
  error: null,

  // Function to check authentication status on app load
  checkAuth: () => {
    const { isAuthenticated } = get(); // Get current state to prevent unnecessary updates
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    // Only update state if authentication has actually changed
    if (token && user && !isAuthenticated) {
      set({
        user: user,
        token: token,
        isAuthenticated: true,
        isLoading: false,
      });
    } else if (!token || !user) {
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } else {
      // Prevent unnecessary re-renders by setting isLoading to false only if needed
      set({ isLoading: false });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });

    try {
      console.log("Login started");
      const response = await api.post("/Auth/login", { email, password });
      const { model, status } = response.data;
      console.log("API Response:", response.data);

      if (status === "Success" && model) {
        console.log("User found, logging in:", model.name);

        // Store user & token in localStorage
        localStorage.setItem("user", JSON.stringify(model));
        localStorage.setItem("token", model.token);

        set({
          user: model,
          token: model.token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        return true;
      } else {
        console.log("Invalid email or password");
        set({ error: "Invalid email or password", isLoading: false });
        return false;
      }
    } catch (err) {
      console.error("Login error:", err);
      set({
        error: err.response?.data?.message || "Login failed",
        isLoading: false,
      });
      return false;
    }
  },

  logout: () => {
    console.log("User logged out");

    // Clear localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // Reset Zustand state
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  },
}));

export default useLoginAuthStore;
