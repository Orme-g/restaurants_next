import { z } from "zod";

export const restaurantsSearchSchema = z.object({
    subway: z.string(),
    cousine: z.string(),
    sortBy: z.enum(["cheap", "expensive"]),
});

export type IRestaurantSearchCriteria = z.infer<typeof restaurantsSearchSchema>;
