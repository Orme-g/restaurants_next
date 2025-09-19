"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useAuthStore } from "@/shared/store/auth.store";
import Spinner from "@/shared/ui/spinner/Spinner";

interface IToggleUserMenuButtonProps {
    handleProfile: (event: React.MouseEvent<HTMLElement>) => void;
}
const ToggleUserMenuButton: React.FC<IToggleUserMenuButtonProps> = ({ handleProfile }) => {
    const pathname = usePathname();
    const isAuth = useAuthStore((state) => state.isAuth);
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
    const spinner = (
        <div style={{ height: "50px", width: "50px" }}>
            <Spinner />{" "}
        </div>
    );
    return isAuth === null ? spinner : isAuth === true ? ifAuth : ifUnauth;
};
export default ToggleUserMenuButton;
