"use client";
import React from "react";
import Link from "next/link";
import { Menu, MenuItem, ListItemIcon } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserTie, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useLogout } from "../api/useLogout";
import type { IUserStoreData } from "@/entities/user/models/user.types";

import styles from "./UserMenu.module.scss";

interface IUserMenuProps {
    anchorEl: HTMLElement | null;
    handleClose: () => void;
    userData: IUserStoreData;
}

const UserMenu: React.FC<IUserMenuProps> = ({ anchorEl, handleClose, userData }) => {
    const { name, role, id } = userData;
    const isAdmin = role?.includes("admin");
    const { mutate: logout } = useLogout();
    const admin = (
        <Link href={`/admin`} onClick={handleClose}>
            <MenuItem>
                <ListItemIcon>
                    <FontAwesomeIcon icon={faUserTie} />
                </ListItemIcon>
                Админ панель
            </MenuItem>
        </Link>
    );

    return (
        <>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <div className={styles["menu__username"]}>{name}</div>
                <Link href={`/profile/${id}`}>
                    <MenuItem>
                        <ListItemIcon>
                            <FontAwesomeIcon icon={faUser} className={styles["menu__icon"]} />
                        </ListItemIcon>
                        Посмотреть профиль
                    </MenuItem>
                </Link>
                {isAdmin ? admin : null}
                <MenuItem onClick={() => logout()}>
                    <ListItemIcon>
                        <FontAwesomeIcon
                            icon={faArrowRightFromBracket}
                            className={styles["menu__icon"]}
                        />
                    </ListItemIcon>
                    Выйти
                </MenuItem>
            </Menu>
        </>
    );
};
export default UserMenu;
