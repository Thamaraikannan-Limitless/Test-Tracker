import { create } from "zustand";
import api from "../API/AxiosInterceptor";

const useSignupAuthStore = create((set) => ({
  isLoading: false,
  error: null,
  success: false,
  successMessage: "",

  // Enhanced reset function with force parameter
  resetState: (options = {}) => {
    const defaultReset = {
      error: null,
      success: false,
      successMessage: "",
      isLoading: false,
    };

    // This allows for partial resets if needed
    set({ ...defaultReset, ...options });
  },

  signup: async (name, email, password, confirmPassword, clearFormFields) => {
    set({ isLoading: true, error: null, success: false, successMessage: "" });

    // Check if passwords match
    if (password !== confirmPassword) {
      set({
        error: "Passwords do not match!",
        isLoading: false,
      });
      return;
    }

    try {
      // Call API for registration
      const response = await api.post("/Auth/register", {
        name,
        email,
        password,
      });

      const { data } = response;

      if (data.status === "Success") {
        clearFormFields();

        set({
          success: true,
          isLoading: false,
          successMessage: "User registered successfully!",
        });

        // Navigate to login page after 2 seconds
        setTimeout(() => {
          set({ successMessage: "", success: false, error: null });
          window.location.href = "/login";
        }, 2000);
      } else {
        // Handle unsuccessful registration with status other than "Success"
        const errorMsg = data.message || "Registration failed!";
        const isEmailError =
          errorMsg.toLowerCase().includes("email") ||
          (data.model && data.model.email === null);

        set({
          error: isEmailError ? "Email already registered!" : errorMsg,
          isLoading: false,
        });
      }
    } catch (error) {
      // Handle API error responses
      const errorResponse = error.response?.data;
      const errorMsg = errorResponse?.message || "";
      const isEmailError = errorMsg.toLowerCase().includes("email");

      set({
        error: isEmailError
          ? "Email already registered!"
          : errorMsg || "Error signing up! Please try again.",
        isLoading: false,
      });
    }
  },
}));

export default useSignupAuthStore;
