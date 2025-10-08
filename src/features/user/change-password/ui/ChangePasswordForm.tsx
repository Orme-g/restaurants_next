"use client";

import { Button, TextField, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { useChangePassword } from "../api/useChangePassword";

import type { IFormData } from "../models/change-password.tyles";
import type { TChangePasswordDTO } from "@/entities/user/models/user.validators";

const ChangePasswordForm = () => {
    const {
        register,
        reset,
        handleSubmit,
        getValues,
        formState: { errors },
        setError,
    } = useForm({
        mode: "onSubmit",
        defaultValues: {
            oldPass: "",
            newPass: "",
            newPassRepeat: "",
        },
    });
    const { mutateAsync: changePassword, isPending } = useChangePassword(setError);
    function onSubmit(data: IFormData) {
        const dataToSend: TChangePasswordDTO = { oldPass: data.oldPass, newPass: data.newPass };
        changePassword(dataToSend).then(() => reset());
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2} width={250} mb={2}>
                <TextField
                    label="Старый пароль"
                    size="small"
                    type="password"
                    {...register("oldPass", {
                        required: "Обязательное поле",
                    })}
                    error={!!errors.oldPass}
                    helperText={errors.oldPass?.message}
                    autoComplete="current-password"
                />
                <TextField
                    label="Новый пароль"
                    size="small"
                    type="password"
                    {...register("newPass", {
                        validate: (value) => {
                            if (!value) return "Обязательное поле";
                            if (value.length < 8) return "Минимум 8 символов";
                        },
                    })}
                    error={!!errors.newPass}
                    helperText={errors.newPass?.message}
                    autoComplete="new-password"
                />
                <TextField
                    label="Повторите пароль"
                    size="small"
                    type="password"
                    {...register("newPassRepeat", {
                        validate: (value) => {
                            if (!value) return "Обязательное поле";
                            if (value.length < 8) return "Минимум 8 символов";
                            if (value !== getValues("newPass")) return "Пароли не совпадают";
                        },
                    })}
                    error={!!errors.newPassRepeat}
                    helperText={errors.newPassRepeat?.message}
                    autoComplete="new-password-repeat"
                />
                <Button variant="outlined" type="submit" disabled={isPending}>
                    Подтвердить
                </Button>
            </Stack>
        </form>
    );
};
export default ChangePasswordForm;
