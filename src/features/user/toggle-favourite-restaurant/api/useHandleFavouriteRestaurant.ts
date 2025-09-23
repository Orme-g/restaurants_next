import { baseFetch } from "@/shared/api/baseFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useInteractive } from "@/shared/store/interactive.store";
import type { THandleFavouriteData } from "@/entities/user/models/user.validators";

export function useHandleFavouriteRestaurant() {
    const queryClient = useQueryClient();
    const callSnackbar = useInteractive((state) => state.callSnackbar);
    return useMutation({
        mutationFn: (data: THandleFavouriteData) =>
            baseFetch<"added" | "removed">("/api/user/toggle-favourite", {
                method: "PATCH",
                body: JSON.stringify(data),
            }),
        onMutate: async (variables) => {
            const { restId, favourite } = variables;
            await queryClient.cancelQueries({ queryKey: ["check-favourite", restId] });
            const prevValue = queryClient.getQueryData<boolean>(["check-favourite", restId]);
            queryClient.setQueryData<boolean>(["check-favourite", restId], favourite);
            return { prevValue };
        },
        onSuccess: (data) => {
            switch (data) {
                case "added": {
                    callSnackbar({ text: "Ресторан добавлен в избранное", type: "success" });
                    break;
                }
                case "removed": {
                    callSnackbar({ text: "Ресторан убран из избранного", type: "warning" });
                    break;
                }
            }
        },
        onError: (error, variables, context) => {
            if (context?.prevValue !== undefined) {
                queryClient.setQueryData(["check-favourite", variables.restId], context.prevValue);
            }
            callSnackbar({ text: "Ошибка добавления ресторана в избранное", type: "error" });
        },
        // onSuccess: (_, variables) => {
        //     queryClient.invalidateQueries({ queryKey: ["check-favourite", variables.restId] });
        // },
    });
}
