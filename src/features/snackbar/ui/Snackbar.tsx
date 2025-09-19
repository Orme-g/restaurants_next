"use client";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useInteractive } from "@/shared/store/interactive.store";

const AppSnackbar = () => {
    const { snackbarData, hideSnackbar, displaySnackbar } = useInteractive();

    return (
        <Snackbar
            key={snackbarData?.text}
            open={displaySnackbar}
            autoHideDuration={4000}
            onClose={hideSnackbar}
            onClick={hideSnackbar}
        >
            <MuiAlert elevation={6} variant="filled" severity={snackbarData.type}>
                {snackbarData.text}
            </MuiAlert>
        </Snackbar>
    );
};

export default AppSnackbar;
