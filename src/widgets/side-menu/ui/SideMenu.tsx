"use client";
import { useState } from "react";
import Link from "next/link";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Collapse } from "@mui/material";
import { useInteractive } from "@/shared/store/interactive.store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faPhoneVolume,
    faAngleDown,
    faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
import {
    faHouse,
    faStar,
    faCommentDots,
    faLightbulb,
    faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";

import styles from "./SideMenu.module.scss";

const SideMenu = () => {
    const [contactUs, setContactUs] = useState(false);
    const { isSideMenuOpen, toggleSideMenu } = useInteractive();
    const toggleContact = () => {
        setContactUs(!contactUs);
    };

    return (
        <Drawer anchor="left" open={isSideMenuOpen} onClose={() => toggleSideMenu()}>
            <List sx={{ width: "300px" }} className={styles["side-menu"]}>
                <Link href="/">
                    <ListItemButton onClick={() => toggleSideMenu()}>
                        <ListItemIcon>
                            <FontAwesomeIcon icon={faHouse} />
                        </ListItemIcon>
                        <ListItemText primary="Главная страница" />
                    </ListItemButton>
                </Link>
                <Link href="/find-restaurant">
                    <ListItemButton onClick={() => toggleSideMenu()}>
                        <ListItemIcon>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </ListItemIcon>
                        <ListItemText primary="Подобрать ресторан" />
                    </ListItemButton>
                </Link>
                <Link href="/doner-articles">
                    <ListItemButton onClick={() => toggleSideMenu()}>
                        <ListItemIcon>
                            <FontAwesomeIcon icon={faStar} />
                        </ListItemIcon>
                        <ListItemText primary="Лучшая шаверма" />
                    </ListItemButton>
                </Link>
                <Link href="/blog">
                    <ListItemButton onClick={() => toggleSideMenu()}>
                        <ListItemIcon>
                            <FontAwesomeIcon icon={faCommentDots} />
                        </ListItemIcon>
                        <ListItemText primary="Блог" />
                    </ListItemButton>
                </Link>

                <ListItemButton onClick={toggleContact}>
                    <ListItemIcon>
                        <FontAwesomeIcon icon={faLightbulb} />
                    </ListItemIcon>
                    <ListItemText primary="Связаться с нами" />
                    {contactUs ? (
                        <FontAwesomeIcon icon={faAngleUp} />
                    ) : (
                        <FontAwesomeIcon icon={faAngleDown} />
                    )}
                </ListItemButton>
                <Collapse in={contactUs} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <FontAwesomeIcon icon={faPaperPlane} />
                            </ListItemIcon>
                            <ListItemText primary="Написать письмо" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <FontAwesomeIcon icon={faPhoneVolume} />
                            </ListItemIcon>
                            <ListItemText primary="Позвонить" />
                        </ListItemButton>
                    </List>
                </Collapse>
            </List>
        </Drawer>
    );
};

export default SideMenu;
