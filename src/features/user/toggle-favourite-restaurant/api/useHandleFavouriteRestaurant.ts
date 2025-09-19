import { baseFetch } from "@/shared/api/baseFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { THandleFavouriteData } from "@/entities/user/models/user.validators";

export function useHandleFavouriteRestaurant() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: THandleFavouriteData) =>
            baseFetch("/api/user/toggle-favourite", {
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
        onError: (error, variables, context) => {
            if (context?.prevValue !== undefined) {
                queryClient.setQueryData(["check-favourite", variables.restId], context.prevValue);
            }
        },
        // onSuccess: (_, variables) => {
        //     queryClient.invalidateQueries({ queryKey: ["check-favourite", variables.restId] });
        // },
    });
}
