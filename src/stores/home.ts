import { defineStore } from "pinia";

export const useHomeStore = defineStore({
  id: 'home',
  state: () => ({
    activeNav: 'tab_today',
    showSelectTheme: false,
    searchText: '',
    activeSideBar: '',
    dialog: {
      show: false,
      title: '',
      subtitle: '',
      action: () => {},
    }
  })
});