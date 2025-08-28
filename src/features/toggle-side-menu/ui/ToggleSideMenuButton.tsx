"use client";
import { IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import { useInteractive } from "@/shared/store/interactive.store";

const ToggleSideMenuButton = () => {
    const { toggleSideMenu } = useInteractive();
    return (
        <IconButton color="inherit" onClick={() => toggleSideMenu()}>
            <FontAwesomeIcon icon={faBars} style={{ height: "20px", width: "20px" }} />
        </IconButton>
    );
};

export default ToggleSideMenuButton;
