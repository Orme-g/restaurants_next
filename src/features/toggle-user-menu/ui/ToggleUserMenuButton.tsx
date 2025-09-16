"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { authStore } from "@/shared/store/auth.store";

interface IToggleUserMenuButtonProps {
    handleProfile: (event: React.MouseEvent<HTMLElement>) => void;
}
const ToggleUserMenuButton: React.FC<IToggleUserMenuButtonProps> = ({ handleProfile }) => {
    const pathname = usePathname();
    const isAuth = authStore((state) => state.isAuth);
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
            <Link href={`/login?redirect=${pathname}`}>Войти</Link>
        </Button>
    );
    return isAuth ? ifAuth : ifUnauth;
};
export default ToggleUserMenuButton;
