// src/store/ticketStore.js
import { create } from "zustand";
import api from "../API/AxiosInterceptor";

// Create the store
const useTicketDisplayStore = create((set, get) => ({
  // State
  tickets: [],
  ticketDetails: {},
  loading: false,
  error: null,

  // Actions
  fetchAllTickets: async () => {
    set({ loading: true, error: null });

    try {
      // Using your Axios instance correctly - no need for response.json() with Axios
      const response = await api.post("/Ticket/details/list", {
        pageNumber: 1,
        pageSize: 50,
      });

      // Axios already parses JSON - data is in response.data
      const data = response.data.model;
      console.log(data);

      set({ tickets: data, loading: false });
    } catch (err) {
      set({
        error: `Failed to fetch tickets: ${err.message}`,
        loading: false,
      });
    }
  },

  fetchTicketById: async (ticketId) => {
    // Check if we already have this ticket's details
    const existingTicket = get().ticketDetails[ticketId];
    if (existingTicket) {
      return existingTicket;
    }

    set({ loading: true, error: null });

    try {
      // Fixed the endpoint and Axios handling
      const response = await api.get(`/Ticket/${ticketId}/details`);

      // Axios data is already parsed
      const data = response.data.model;

      // Update the ticketDetails state with the new ticket
      set((state) => ({
        ticketDetails: {
          ...state.ticketDetails,
          [ticketId]: data,
        },
        loading: false,
      }));

      return data;
    } catch (err) {
      set({
        error: `Failed to fetch ticket details: ${err.message}`,
        loading: false,
      });
      throw err;
    }
  },

  // Reset error state
  clearError: () => set({ error: null }),
}));

export default useTicketDisplayStore;
