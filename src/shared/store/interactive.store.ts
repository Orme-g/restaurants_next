import { create } from "zustand";

interface IInteractiveStore {
    isSideMenuOpen: boolean;
    toggleMenu: () => void;
}

export const useInteractive = create<IInteractiveStore>((set) => ({
    isSideMenuOpen: false,
    toggleMenu: () => set((state) => ({ isSideMenuOpen: !state.isSideMenuOpen })),
}));
