import RegisterForm from "@/features/auth/auth-register-form/ui/RegisterForm";
import styles from "./page.module.scss";
const RegisterPage = () => {
    return (
        <div className={styles["register-page"]}>
            <div className={styles["register-page__content"]}>
                <div className={styles["register-page__title"]}>
                    Зарегистрируйтесь, чтобы получить доступ ко всем возможностям WEATS
                </div>
                <div className={styles["register-page__form"]}>
                    <RegisterForm />
                </div>
            </div>
        </div>
    );
};
export default RegisterPage;
