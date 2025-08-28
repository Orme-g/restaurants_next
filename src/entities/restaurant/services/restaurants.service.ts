import * as restaurantRepo from "../repositories/restaurants.repo";

import type { IRestaurantSearchCriteria } from "../models/restaurant.validators";
import type { TRestaurantSortCriteria } from "../models/restaurant.types";
import type { ClientSession } from "mongoose";

export async function getNewlyAddedRestaurants(limit?: number) {
    return restaurantRepo.getLastAddedRestaurants(limit);
}

export async function getRestaurantProfile(id: string) {
    return restaurantRepo.getRestaurantById(id);
}

export async function getRestaurantsBySortCriteria(
    criteria: TRestaurantSortCriteria,
    limit: number
) {
    if (!criteria) {
        throw new Error("Sort criteria is not passes");
    }
    let searchCriteria: { bill: 1 | -1 } | { averageRating: -1 };
    switch (criteria) {
        case "expensive":
            searchCriteria = { bill: -1 };
            break;
        case "cheap":
            searchCriteria = { bill: 1 };
            break;
        case "best":
            searchCriteria = { averageRating: -1 };
            break;
        default:
            throw new Error("Invalid passed search criteria");
    }
    return restaurantRepo.getSortedRestaurants(searchCriteria, limit);
}

export async function findRestaurantByUserCriterias(criterias: IRestaurantSearchCriteria) {
    const { subway, cousine, sortBy } = criterias;
    const sort = sortBy === "expensive" ? -1 : 1;
    return restaurantRepo.findRestaurantByCriteria(subway, cousine, sort);
}

export async function serachRestaurantByUserInput(input: string) {
    return restaurantRepo.findRestaurantByNameInput(input);
}

export async function updateRestaurantRating(
    restaurantId: string,
    rating: number,
    session?: ClientSession
) {
    const restaurant = await restaurantRepo.getRestaurantById(restaurantId, session);
    if (!restaurant) throw new Error("Restaurant not found");
    const ratingMarksArray = [...restaurant.rating, rating];
    const newAverageRating = +(
        ratingMarksArray.reduce((acc, val) => acc + val, 0) / ratingMarksArray.length
    ).toFixed(3);
    return restaurantRepo.updateRatingAndAverageRating(
        restaurantId,
        rating,
        newAverageRating,
        session
    );
}
