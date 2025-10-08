"use client";

import ProfileData from "@/widgets/user-profile-data/ui/ProfileData";

import styles from "./page.module.scss";

const Profile = () => {
    return (
        <div className={styles["profile-page"]}>
            <ProfileData />
        </div>
    );
};
export default Profile;
