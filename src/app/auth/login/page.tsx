import LoginForm from "@/features/auth/auth-login-form/ui/LoginForm";
import styles from "./page.module.scss";

const LoginPage = () => {
    return (
        <div className={styles["login-page"]}>
            <div className={styles["login-page__content"]}>
                <div className={styles["login-page__title"]}>Войдите в свой аккаунт на WEATS:</div>
                <div className={styles["login-page__form"]}>
                    <LoginForm />
                </div>
            </div>
        </div>
    );
};
export default LoginPage;
