import { create } from "zustand";
import api from "../API/AxiosInterceptor";

const initialFormState = {
  project: "",
  ticketNumber: "",
  ticketDate: "",
  reportedBy: "",
  reportedDate: "",
  bugDetails: "",
  priority: "",
  screenshots: [],
};

const useTicketStore = create((set, get) => ({
  formData: initialFormState,
  errors: {},
  
  setFormField: (field, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
      errors: {
        ...state.errors,
        [field]: "",
      },
    })),
    
  addScreenshots: (files) =>
    set((state) => ({
      formData: {
        ...state.formData,
        screenshots: [...state.formData.screenshots, ...files],
      },
      errors: {
        ...state.errors,
        screenshots: "",
      },
    })),
    
  deleteScreenshot: (index) =>
    set((state) => ({
      formData: {
        ...state.formData,
        screenshots: state.formData.screenshots.filter((_, i) => i !== index),
      },
    })),
    
  setErrors: (errorObj) => set({ errors: errorObj }),
  
  resetForm: () => set({ formData: initialFormState, errors: {} }),
  
  validateForm: () => {
    const { formData, setErrors } = get();
    const newErrors = {};
    
    if (!formData.project) newErrors.project = "Please select a project.";
    if (!formData.ticketNumber) newErrors.ticketNumber = "Ticket number is required.";
    if (!formData.ticketDate) newErrors.ticketDate = "Ticket date is required.";
    if (!formData.reportedBy) newErrors.reportedBy = "Please select a ReportedBy.";
    if (!formData.reportedDate) newErrors.reportedDate = "Please select a ReportedDate.";
    if (!formData.bugDetails) newErrors.bugDetails = "Bug details are required.";
    if (!formData.priority) newErrors.priority = "Please select a priority.";
    if (formData.screenshots.length === 0) newErrors.screenshots = "Please select at least one image.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  },
  
  submitForm: async (onSuccess) => {
    const { formData, validateForm, resetForm } = get();
    if (!validateForm()) return false;
  
    const data = new FormData();
  
    // Format dates properly for API (ISO format)
    const formattedTicketDate = new Date(formData.ticketDate).toISOString();
    const formattedReportedDate = new Date(formData.reportedDate).toISOString();
    
    // Append form data to FormData object with proper type conversion
    data.append("ProjectId", parseInt(formData.project));
    data.append("TicketNumber", formData.ticketNumber);
    data.append("TicketDate", formattedTicketDate);
    data.append("ReportedBy", parseInt(formData.reportedBy));
    data.append("ReportedOn", formattedReportedDate);  // Fixed to use the correct date
    data.append("BugDetails", formData.bugDetails);
    data.append("Priority", formData.priority);
  
    // Append screenshots if available
    if (formData.screenshots.length > 0) {
      formData.screenshots.forEach((file, index) => {
        if (file instanceof File) {
          data.append("Attachments", file);
        }
      });
    }  
    try {
      
      const response = await api.post("/Ticket", data, {
        headers: { 
          "Content-Type": "multipart/form-data"
        }
      });
  
      // Enhanced response logging
      console.log("Server Response:", {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        data: response.data
      });
      
      // More detailed response validation
      if (response.data && 
          (response.data.success === true || response.status >= 200 && response.status < 300)) {
        console.log("Ticket created successfully:", response.data);
        if (onSuccess) onSuccess();
        resetForm();
        return true;
      } else {
        console.warn("Server returned success code but response may indicate failure:", response);
        alert(`Warning: Server returned ${response.status} but the operation may not be complete. ${response.data?.message || ''}`);
        return false;
      }
    }
    catch (error) {
      console.error("Error submitting ticket:", error);
      console.error("Response data:", error.response?.data);
      console.error("Response status:", error.response?.status);
      console.error("Response headers:", error.response?.headers);
      
      alert(`Error: ${error.response?.data?.message || "An error occurred while submitting the ticket"}`);
      return false;
    }
  },
}));

export default useTicketStore;