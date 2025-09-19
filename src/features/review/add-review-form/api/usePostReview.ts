import { baseFetch } from "@/shared/api/baseFetch";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useInteractive } from "@/shared/store/interactive.store";
import type { TNewReviewDTO } from "@/entities/review/models/review.validators";
import type { TReview } from "@/entities/review/models/review.types";

export function usePostReview() {
    const callSnackbar = useInteractive((state) => state.callSnackbar);
    const queryClient = useQueryClient();
    return useMutation<TReview, Error, TNewReviewDTO>({
        mutationFn: (data) =>
            baseFetch("/api/reviews/post-review", { method: "POST", body: JSON.stringify(data) }),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["check-reviewed", variables.restId] });
            callSnackbar({
                text: "Ваш отзыв успешно отправлен. Он будет добавлен после проверки",
                type: "success",
            });
        },
        onError: (error) => {
            callSnackbar({ text: `Ошибка: ${error.message}`, type: "error" });
        },
    });
}
