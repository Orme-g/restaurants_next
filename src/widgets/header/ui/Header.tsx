"use client";
import { useState } from "react";
import styles from "./Header.module.scss";

import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Link from "next/link";
import ToggleSideMenuButton from "@/features/toggle-side-menu/ui/ToggleSideMenuButton";
import ToggleUserMenuButton from "@/features/toggle-user-menu/ui/ToggleUserMenuButton";
import UserMenu from "@/features/user-menu/ui/UserMenu";

const Header = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleProfile = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    // const userData = useAppSelector((state) => state.interactive.userData);
    // const isAuth = useAppSelector((state) => state.interactive.isAuth);
    // const name = userData?.name;
    // const role = userData?.role;
    // const isAdmin = role?.includes("admin");

    // const handleLogout = () => {
    //     logout()
    //         .unwrap()
    //         .then((result) => {
    //             dispatch(callSnackbar({ type: "info", text: result.message }));
    //             dispatch(logoutUser());
    //             dispatch(baseApi.util.resetApiState());
    //         })
    //         .catch((error) =>
    //             dispatch(callSnackbar({ type: "error", text: "Что-то пошло не так" }))
    //         );
    //     handleClose();
    // };
    // const isLoading = <div className="header-spinner">{/* <SmallSpinner /> */}</div>;
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
                        <ToggleUserMenuButton handleProfile={handleProfile} isAuth={true} />
                        <UserMenu anchorEl={anchorEl} handleClose={handleClose} isAdmin={true} />
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
