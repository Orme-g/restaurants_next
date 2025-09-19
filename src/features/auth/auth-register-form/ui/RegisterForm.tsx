"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Stack, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useRegister } from "../api/useRegister";

import styles from "./RegisterForm.module.scss";

import type { TRegisterData } from "@/processes/auth/model/auth.validators";

const RegisterForm = () => {
    const [passError, setPassError] = useState<null | string>(null);
    const [passwordCheck, setPasswordCheck] = useState<string>("");
    const [userExistError, setUserExistError] = useState<null | string>(null);
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        defaultValues: {
            username: "",
            name: "",
            surname: "",
            birthday: null,
            email: "",
            password: "",
        },
    });
    const { mutateAsync: registerUser } = useRegister();
    function onSubmit(data: TRegisterData) {
        if (data.password !== passwordCheck) {
            return setPassError("Пароли не совпадают");
        }
        const { username, name, surname, birthday, email, password } = data;
        const newUser: TRegisterData = {
            username,
            name,
            surname,
            birthday: new Date(birthday!),
            email,
            password,
        };

        registerUser(newUser).then(() => {
            reset();
            setPasswordCheck("");
        });
    }
    return (
        <form className={styles["register-form"]} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} width={"80%"} mb={2} sx={{ margin: "0 auto", marginTop: "30px" }}>
                <TextField
                    label="Никнейм на WEATS *"
                    {...register("username", {
                        required: "Придумайте никнейм",
                    })}
                    error={!!errors.username}
                    helperText={errors.username?.message}
                />
                <TextField
                    label="Ваше имя *"
                    {...register("name", {
                        required: "Введите ваше имя",
                    })}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />
                <TextField label="Ваша фамилия" {...register("surname", { maxLength: 20 })} />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Controller
                        name="birthday"
                        control={control}
                        rules={{
                            required: "Заполните дату рождения",
                        }}
                        render={({ field }) => (
                            <DatePicker
                                {...field}
                                format="DD/MM/YYYY"
                                label="Дата рождения *"
                                sx={{ width: "200px" }}
                                disableFuture
                                slotProps={{
                                    textField: {
                                        error: !!errors.birthday,
                                        helperText: errors.birthday?.message,
                                    },
                                }}
                            />
                        )}
                    />
                </LocalizationProvider>
                <TextField
                    label="Электронная почта *"
                    {...register("email", {
                        required: "Введите корректный адрес электронной почты",
                        pattern: /^\S+@\S+\.\S+$/,
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
                <TextField
                    label="Придумайте пароль *"
                    type="password"
                    {...register("password", {
                        required: "Придумайте пароль. Минимум 8 символов. ",
                        minLength: {
                            value: 8,
                            message: "Минимум 8 символов",
                        },
                    })}
                    error={!!errors.password}
                />
                <TextField
                    label="Повторите пароль *"
                    type="password"
                    value={passwordCheck}
                    onChange={(e) => setPasswordCheck(e.target.value)}
                    error={!!errors.password || !!passError}
                    helperText={errors.password?.message || passError}
                />
                <div className={styles["register-form__actions"]}>
                    {/* {isLoading ? ( */}
                    <div style={{ height: "50px", width: "50px" }}>{/* <SmallSpinner /> */}</div>
                    {/* ) : ( */}
                    <Button type="submit">Зарегистрироваться</Button>
                    {/* )} */}
                    <Button />
                </div>
                <div className={styles["register-form__error"]}>{userExistError}</div>
            </Stack>
        </form>
    );
};

export default RegisterForm;
