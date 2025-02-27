import { create } from "zustand";
import api from "../API/AxiosInterceptor";

const useProjectDeveloperStore = create((set, get) => ({
  projects: [],
  testers: [],
  developers: [],
  isLoading: false,
  error: null,

  fetchProjects: async () => {
    if (get().projects.length > 0) return; // Prevent duplicate API calls

    set({ isLoading: true, error: null });
    try {
      const response = await api.post("/Project/list", {});
      if (response.data?.model) {
        set({ projects: response.data.model });
      } else {
        throw new Error("Unexpected project data format");
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      set({ error: error.message, projects: [] });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchTesters: async () => {
    if (get().testers.length > 0) return; // Prevent duplicate API calls

    set({ isLoading: true, error: null });
    try {
      const response = await api.post("/Developer/list", {});
      if (response.data?.model) {
        const testers = response.data.model.filter(
          (user) => user.department === "Tester"
        );
        set({ testers: testers });
      } else {
        throw new Error("Unexpected developer data format");
      }
    } catch (error) {
      console.error("Error fetching developers:", error);
      set({ error: error.message, testers: [] });
    } finally {
      set({ isLoading: false });
    }
    },
    fetchDevelopers: async () => {
        if (get().developers.length > 0) return; // Prevent duplicate API calls
    
        set({ isLoading: true, error: null });
        try {
          const response = await api.post("/Developer/list", {});
          if (response.data?.model) {
            const developers = response.data.model.filter(
              (user) => user.department === "Developer"
            );
            set({ developers: developers });
          } else {
            throw new Error("Unexpected developer data format");
          }
        } catch (error) {
          console.error("Error fetching developers:", error);
          set({ error: error.message, developers: [] });
        } finally {
          set({ isLoading: false });
        }
      },
}));

export default useProjectDeveloperStore;
