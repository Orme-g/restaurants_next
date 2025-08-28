import { create } from "zustand";

interface IInteractiveStore {
    isSideMenuOpen: boolean;
    toggleSideMenu: () => void;
}

export const useInteractive = create<IInteractiveStore>((set) => ({
    isSideMenuOpen: false,
    toggleSideMenu: () => set((state) => ({ isSideMenuOpen: !state.isSideMenuOpen })),
}));
