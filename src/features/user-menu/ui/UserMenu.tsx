"use client";
import React from "react";
import Link from "next/link";
import { Menu, MenuItem, ListItemIcon } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserTie, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import styles from "./UserMenu.module.scss";

interface IUserMenuProps {
    anchorEl: HTMLElement | null;
    handleClose: () => void;
    isAdmin: boolean;
}

const UserMenu: React.FC<IUserMenuProps> = ({ anchorEl, handleClose, isAdmin }) => {
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
                <div className={styles["menu__username"]}>User</div>
                <Link href={`/profile`}>
                    <MenuItem>
                        <ListItemIcon>
                            <FontAwesomeIcon icon={faUser} className={styles["menu__icon"]} />
                        </ListItemIcon>
                        Посмотреть профиль
                    </MenuItem>
                </Link>
                {isAdmin ? admin : null}
                <MenuItem>
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
