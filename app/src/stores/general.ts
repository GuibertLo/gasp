import { defineStore } from "pinia";

// Defintion of the Pinia store for the genral state of the application
export const useGeneralStore = defineStore("general", {
  // Pinia store's properties (state)
  state: () => ({
    /**
     * @type boolean
     * Used to determine wheter the sidebar is displayed.
     */
    sidebarStatus: true as boolean,
  }),

  // Pinia store's getters, to retreive data
  getters: {
    /**
     * Returns the current status of the sidebar
     * @param state - automatically given by the Pinia store.
     * @returns { boolean } the state of the sidebar
     */
    isSidebarActive: (state) => (): boolean => {
      return state.sidebarStatus;
    },
  },

  // Pinia store's actions, to act on data
  actions: {
    /**
     * Change the state of the sidebar, based on the current value.
     * Toggles from one value to the other.
     */
    toggleSidebar(): void {
      this.sidebarStatus = !this.sidebarStatus;
    },
  },
});
