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
            await queryClient.cancelQueries({ queryKey: ["favourite", restId] });
            const prevValue = queryClient.getQueryData<boolean>(["favourite", restId]);
            queryClient.setQueryData<boolean>(["favourite", restId], favourite);
            return { prevValue };
        },
        onError: (error, variables, context) => {
            if (context?.prevValue !== undefined) {
                queryClient.setQueryData(["favourite", variables.restId], context.prevValue);
            }
        },
        // onSuccess: (_, variables) => {
        //     queryClient.invalidateQueries({ queryKey: ["favourite", variables.restId] });
        // },
    });
}
