// Create a static store to manage all open menus
const MenuManager = {
  activeMenu: null,
  listeners: [],

  setActiveMenu(menuId) {
    this.activeMenu = menuId;
    // Notify all listeners that the active menu has changed
    this.listeners.forEach((listener) => listener(menuId));
  },

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  },

  closeAll() {
    this.activeMenu = null;
    this.listeners.forEach((listener) => listener(null));
  },
};

// Add a global click handler to close all menus when clicking outside
if (typeof document !== 'undefined') {
  document.addEventListener("click", () => {
    MenuManager.closeAll();
  });
}

export default MenuManager;