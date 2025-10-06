"use client";

import Link from "next/link";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { useGetProfile } from "../api/useGetProfile";
import calculateExperience from "@/entities/user/lib/calculateExperience";
import transformDate from "@/shared/lib/transfromDate";

import styles from "./ProfileData.module.scss";

const ProfileData = () => {
    const { data: profileData, isPending } = useGetProfile();
    if (isPending || !profileData) {
        return;
    }
    const { avatar, name, username, email, reviews, comments, createdAt, favouriteRestaurants } =
        profileData;
    const status = calculateExperience(reviews);
    const registered = transformDate(createdAt);
    return (
        <section className={styles["profile-data"]}>
            <div className={styles["profile-data__header"]}>
                <div className={styles["profile-data__avatar"]}>
                    <img src={avatar} alt="avatar" />
                </div>
                <div className={styles["profile-data__greet"]}>Привет, {name}</div>
            </div>
            <div className={styles["profile-data__wrapper"]}>
                <div className={styles["profile-data__info"]}>
                    <div className={styles["profile-data__info-item"]}>
                        <div className={styles["profile-data__info-field"]}>Логин:</div>
                        <div className={styles["profile-data__info-value"]}>{username}</div>
                    </div>

                    <div className={styles["profile-data__info-item"]}>
                        <div className={styles["profile-data__info-field"]}>Электронная почта:</div>
                        <div className={styles["profile-data__info-value"]}>{email}</div>
                    </div>
                    <div className={styles["profile-data__info-item"]}>
                        <div className={styles["profile-data__info-field"]}>Статус:</div>
                        <div className={styles["profile-data__info-value"]}>{status}</div>
                    </div>
                    <div className={styles["profile-data__info-item"]}>
                        <div className={styles["profile-data__info-field"]}>Оставлено отзывов:</div>
                        <div className={styles["profile-data__info-value"]}>{reviews}</div>
                    </div>
                    <div className={styles["profile-data__info-item"]}>
                        <div className={styles["profile-data__info-field"]}>Комментариев:</div>
                        <div className={styles["profile-data__info-value"]}>{comments}</div>
                    </div>
                    <div className={styles["profile-data__info-item"]}>
                        <div className={styles["profile-data__info-field"]}>Зарегистрирован:</div>
                        <div className={styles["profile-data__info-value"]}>{registered}</div>
                    </div>
                    <div className={styles["profile-data__info-item"]}>
                        <div className={styles["profile-data__info-field"]}>
                            Изменить фото профиля:
                        </div>
                        <div className={styles["profile-data__info-value"]}>
                            <form>
                                <div className={styles["change-avatar-wrapper"]}>
                                    <Button variant="outlined" component="label">
                                        Загрузить фото
                                        <input
                                            type="file"
                                            accept="image/*"
                                            hidden
                                            // onChange={(e) => handleFileUpload(e)}
                                        />
                                    </Button>
                                    {/* <div className="upload-image_name">{imageName}</div> */}
                                </div>

                                <Button
                                    type="submit"
                                    style={{ marginTop: 10 }}
                                    variant="contained"
                                    // onClick={(e) => handleSubmit(e)}
                                >
                                    Отправить
                                </Button>
                                {/* <div className={styles["upload-image_helper-text"]}>{avatarSizeError}</div> */}
                            </form>
                        </div>
                    </div>

                    <div className={styles["profile-data__info-item change-password"]}>
                        <div className={styles["profile-data__info-field"]}>
                            <Button
                                // onClick={() => changePassButton()}
                                className={styles["show-change-fields"]}
                            >
                                Изменить пароль
                            </Button>
                        </div>
                        <div className={styles["profile-data__info-value"]}>
                            <div className={styles["password-fields hide"]}>
                                {/* <ChangePasswordForm /> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles["profile-data__favorites"]}>
                    <div className={styles["profile-data__favorites_header"]}>
                        <div className={styles["profile-data__favorites_title"]}>Избранное</div>
                        <FontAwesomeIcon icon={faBookmark} />
                        {/* <Bookmarks fontSize="large" className="profile-data__favorites_icon" /> */}
                    </div>
                    <div className={styles["profile-data__favorites_subtitle"]}>Рестораны:</div>
                    {favouriteRestaurants?.length > 0 ? (
                        <div className={styles["profile-data__favorite-restaurants"]}>
                            {favouriteRestaurants.map((item) => {
                                return (
                                    <Link
                                        key={item.id}
                                        href={`/restaurant/${item.id}`}
                                        className={
                                            styles["profile-data__favorite-restaurants_item"]
                                        }
                                    >
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>
                    ) : (
                        <div className={styles["profile-data__favorite-restaurants_empty"]}>
                            Список пуст. Добавить в избранное вы можете на странице ресторана.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
export default ProfileData;
