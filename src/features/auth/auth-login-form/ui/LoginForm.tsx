"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Stack, TextField, Button } from "@mui/material";
import Link from "next/link";
import { useLogin } from "../api/useLogin";
import { TLoginData } from "@/processes/auth/model/auth.validators";
import styles from "./LoginForm.module.scss";

const LoginForm = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: "",
            password: "",
        },
    });
    const { mutateAsync: login } = useLogin();
    async function onSubmit(data: TLoginData) {
        login(data).then(() => reset());
    }
    return (
        <form className={styles["login-form"]} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2} width={"100%"}>
                <TextField
                    label="Логин"
                    size="medium"
                    fullWidth
                    {...register("username", {
                        required: "Введите логин",
                    })}
                    error={!!errors.username}
                    helperText={errors.username?.message}
                />
                <TextField
                    label="Пароль"
                    type="password"
                    size="medium"
                    fullWidth
                    {...register("password", {
                        required: "Введите пароль",
                    })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />
                {errorMessage ? (
                    <div className={styles["error-message"]}>{errorMessage}</div>
                ) : null}
                <div className={styles["login-form__actions"]}>
                    <Button type="submit">Войти</Button>
                    <Link href={"/register"} className={styles["login-form__link"]}>
                        Регистрация
                    </Link>
                </div>
            </Stack>
        </form>
    );
};
export default LoginForm;
