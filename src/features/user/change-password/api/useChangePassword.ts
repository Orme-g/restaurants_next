import { baseFetch } from "@/shared/api/baseFetch";
import { useMutation } from "@tanstack/react-query";
import { useInteractive } from "@/shared/store/interactive.store";

import { UseFormSetError } from "react-hook-form";

import type { IFormData } from "../models/change-password.tyles";
import type { TChangePasswordDTO } from "@/entities/user/models/user.validators";

export function useChangePassword(setError: UseFormSetError<IFormData>) {
    const callSnackbar = useInteractive((state) => state.callSnackbar);
    return useMutation<string, Error, TChangePasswordDTO>({
        mutationFn: (data) =>
            baseFetch("/api/user/change-password", { method: "PATCH", body: JSON.stringify(data) }),
        onSuccess: (response) => {
            if (response === "Success")
                callSnackbar({ text: "Пароль успешно изменён", type: "success" });
        },
        onError: (error) => {
            if (error.message === "Неверный пароль") {
                setError("oldPass", { message: error.message });
            } else {
                callSnackbar({ text: error.message, type: "error" });
            }
        },
    });
}
