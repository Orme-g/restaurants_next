import { z } from "zod";

export const handleFavouriteSchema = z.object({
    restId: z.string(),
    restName: z.string(),
    favourite: z.boolean(),
});

export type THandleFavouriteData = z.infer<typeof handleFavouriteSchema>;

export const changePasswordSchema = z.object({
    oldPass: z.string(),
    newPass: z.string().min(8, "Минимум 8 символов"),
});

export type TChangePasswordDTO = z.infer<typeof changePasswordSchema>;
