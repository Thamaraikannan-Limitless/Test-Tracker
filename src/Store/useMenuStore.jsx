import create from "zustand";

const useMenuStore = create((set) => ({
  openMenuId: null,
  setOpenMenu: (id) =>
    set((state) => ({ openMenuId: state.openMenuId === id ? null : id })),
}));

export default useMenuStore;
