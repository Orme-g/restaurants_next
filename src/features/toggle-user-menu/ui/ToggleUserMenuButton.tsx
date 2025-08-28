"use client";
import React from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

interface IToggleUserMenuButtonProps {
    handleProfile: (event: React.MouseEvent<HTMLElement>) => void;
    isAuth: boolean;
}
const ToggleUserMenuButton: React.FC<IToggleUserMenuButtonProps> = ({ handleProfile, isAuth }) => {
    const ifAuth = (
        <IconButton
            size="large"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleProfile}
        >
            <FontAwesomeIcon icon={faCircleUser} style={{ height: "20px", width: "20px" }} />
        </IconButton>
    );
    const ifUnauth = (
        <Button color="inherit">
            <Link href={`/login`}>Войти</Link>
        </Button>
    );
    return isAuth ? ifAuth : ifUnauth;
};
export default ToggleUserMenuButton;
