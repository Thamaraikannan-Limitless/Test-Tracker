import { create } from "zustand";
import api from "../API/AxiosInterceptor";

const useAssignFormStore = create((set) => ({
  tickets: [],

  // Assign a ticket (API handles status update)
  assignTicket: async (payload) => {
    try {
      // Send the payload to the API
        const response = await api.put(`/Ticket/assign-ticket`, payload);

      // Update state after successful API response
      set((state) => ({
        tickets: state.tickets.map((ticket) =>
          ticket.id === payload.ticketId
            ? { ...ticket, assignedTo: payload.assignedTo, remarksDeveloper: payload.remarksDeveloper }
            : ticket
        ),
      }));
      console.log("Server Response:", {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        data: response.data
      });
    } catch (error) {
      console.error("Error assigning ticket:", error);
      throw error; // Re-throw the error to handle it in the form
    }
  },
}));

export default useAssignFormStore;