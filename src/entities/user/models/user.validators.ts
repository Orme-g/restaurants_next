import { z } from "zod";

export const handleFavouriteSchema = z.object({
    restId: z.string(),
    restName: z.string(),
    favourite: z.boolean(),
});

export type THandleFavouriteData = z.infer<typeof handleFavouriteSchema>;
