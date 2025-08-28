import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChartLine,
    faCircleInfo,
    faHeadset,
    faUsers,
    faClipboardQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faVk, faInstagram, faGithub } from "@fortawesome/free-brands-svg-icons";

import styles from "./Footer.module.scss";

const Footer = () => {
    return (
        <footer className={styles["footer"]}>
            <div className={styles["footer__information"]}>
                <div className={styles["footer__title"]}>Weats</div>
                <div className={styles["footer__reg"]}>
                    <p>&#169; Weats.ru - est. 2023. Все права защищены.</p>
                    <p>
                        Использование материалов сайта разрешено только со ссылкой на первоисточник.
                    </p>
                    <p>
                        Информация представленная на сайте имеет ознакомительный характер и не
                        является публичной офертой.
                    </p>
                </div>
            </div>
            <div className={styles["footer__links"]}>
                <ul className={styles["footer__navigation"]}>
                    <li className={styles["footer__navigation_item"]}>
                        <Link href="/info/advert">
                            <FontAwesomeIcon
                                icon={faChartLine}
                                className={styles["footer__navigation_icon"]}
                            />{" "}
                            <span>Реклама</span>
                        </Link>
                    </li>
                    <li className={styles["footer__navigation_item"]}>
                        <Link href="/info/about">
                            <FontAwesomeIcon
                                icon={faCircleInfo}
                                className={styles["footer__navigation_icon"]}
                            />{" "}
                            <span>О нас</span>
                        </Link>
                    </li>
                    <li className={styles["footer__navigation_item"]}>
                        <Link href="#">
                            <FontAwesomeIcon
                                icon={faHeadset}
                                className={styles["footer__navigation_icon"]}
                            />{" "}
                            <span>Поддержка</span>
                        </Link>
                    </li>
                    <li className={styles["footer__navigation_item"]}>
                        <Link href="#">
                            <FontAwesomeIcon
                                icon={faUsers}
                                className={styles["footer__navigation_icon"]}
                            />{" "}
                            <span>Сотрудничество</span>
                        </Link>
                    </li>
                    <li className={styles["footer__navigation_item"]}>
                        <Link href="#">
                            <FontAwesomeIcon
                                icon={faClipboardQuestion}
                                className={styles["footer__navigation_icon"]}
                            />{" "}
                            <span>FAQ</span>
                        </Link>
                    </li>
                </ul>
                <ul className={styles["footer__social"]}>
                    <li>
                        <Link href="#">
                            <FontAwesomeIcon
                                icon={faTwitter}
                                className={styles["footer__social_icon"]}
                            />
                        </Link>
                    </li>
                    <li>
                        <Link href="#">
                            <FontAwesomeIcon
                                icon={faVk}
                                className={styles["footer__social_icon"]}
                            />
                        </Link>
                    </li>
                    <li>
                        <Link href="#">
                            <FontAwesomeIcon
                                icon={faInstagram}
                                className={styles["footer__social_icon"]}
                            />
                        </Link>
                    </li>
                    <li>
                        <Link href="#">
                            <FontAwesomeIcon
                                icon={faGithub}
                                className={styles["footer__social_icon"]}
                            />
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
