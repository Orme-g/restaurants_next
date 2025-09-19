import { create } from "zustand";

interface ISnackbarData {
    text: string;
    type: "error" | "info" | "success" | "warning";
}
interface IInteractiveStore {
    isSideMenuOpen: boolean;
    displaySnackbar: boolean;
    snackbarData: ISnackbarData;
    toggleSideMenu: () => void;
    callSnackbar: (data: ISnackbarData) => void;
    hideSnackbar: () => void;
}

export const useInteractive = create<IInteractiveStore>((set) => ({
    isSideMenuOpen: false,
    displaySnackbar: false,
    snackbarData: { text: "", type: "info" },
    toggleSideMenu: () => set((state) => ({ isSideMenuOpen: !state.isSideMenuOpen })),
    callSnackbar: ({ text, type }) =>
        set({
            snackbarData: { text, type },
            displaySnackbar: true,
        }),
    hideSnackbar: () => set({ displaySnackbar: false }),
}));
