import { baseFetch } from "@/shared/api/baseFetch";
import { useMutation } from "@tanstack/react-query";
import { useInteractive } from "@/shared/store/interactive.store";

import type { TReview } from "@/entities/review/models/review.types";
import type { TAdditionalReviewDTO } from "@/entities/review/models/review.validators";

export function usePostAdditionalReview() {
    const callSnackbar = useInteractive((state) => state.callSnackbar);
    return useMutation<TReview, Error, TAdditionalReviewDTO>({
        mutationFn: (body) =>
            baseFetch("/api/reviews/post-additional-review", {
                method: "PATCH",
                body: JSON.stringify(body),
            }),
        onSuccess: () =>
            callSnackbar({
                type: "success",
                text: "Отзыв успешно дополнен. Изменения отобразятся после проверки.",
            }),
        onError: (error) => callSnackbar({ type: "error", text: error.message }),
    });
}
