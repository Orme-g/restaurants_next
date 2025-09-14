"use client";
import { useState } from "react";
import styles from "./Header.module.scss";

import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Link from "next/link";
import ToggleSideMenuButton from "@/features/toggle-side-menu/ui/ToggleSideMenuButton";
import ToggleUserMenuButton from "@/features/toggle-user-menu/ui/ToggleUserMenuButton";
import UserMenu from "@/features/user-menu/ui/UserMenu";
import { authStore } from "@/shared/store/auth.store";

const Header = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const userData = authStore((state) => state.userData);
    const handleProfile = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <AppBar color="inherit" sx={{ backgroundColor: "rgb(244, 244, 244)", color: "#494949" }}>
            <Toolbar>
                <div className={styles["header__items"]}>
                    <div className={styles["header__items_left-side"]}>
                        <ToggleSideMenuButton />
                        <Link href={"/"}>
                            <Typography
                                marginLeft="20px"
                                variant="h5"
                                sx={{ fontWeight: 500, letterSpacing: 1.25 }}
                            >
                                Weats
                            </Typography>
                        </Link>
                    </div>
                    <div className={styles["header__items_right-side"]}>
                        <ToggleUserMenuButton handleProfile={handleProfile} />
                        {userData && (
                            <UserMenu
                                anchorEl={anchorEl}
                                handleClose={handleClose}
                                userData={userData}
                            />
                        )}
                        <Button color="inherit" sx={{ ml: "25px" }}>
                            Помощь
                        </Button>
                    </div>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
