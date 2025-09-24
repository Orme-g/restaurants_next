import * as usersRepo from "../repositories/users.repo";

export const runtime = "nodejs";

export async function getUserById(userId: string) {
    const user = await usersRepo.findUserById(userId);
    if (!user) {
        throw new Error("Пользователь не найден");
    }
    return user;
}
export async function getUserAuthData(userId: string) {
    const user = await usersRepo.findUserById(userId);
    if (!user) {
        throw new Error("Пользователь не найден");
    }
    return { name: user.name, username: user.username, id: user._id, role: user.role };
}

export async function getUserFavouriteRestaurantsList(userId: string) {
    const user = await usersRepo.findUserById(userId);
    if (!user) {
        throw new Error("Пользователь не найден");
    }
    return user.favouriteRestaurants;
}

export async function checkIfRestaurantFavourite(userId: string, restId: string) {
    const isFavourite = await usersRepo.isRestaurantFavourite(userId, restId);
    return isFavourite;
}

export async function checkIfRestaurantReviewed(userId: string, restId: string) {
    const isReviewed = await usersRepo.isRestaurantReviewed(userId, restId);
    return isReviewed;
}

export async function toggleFavouriteRestaurant(
    userId: string,
    restId: string,
    restName: string,
    favourite: boolean
) {
    if (favourite) {
        await usersRepo.addRestaurantToFavourites(userId, restId, restName);
        return "added";
    } else {
        await usersRepo.removeRestaurantFromFavourites(userId, restId);
        return "removed";
    }
}

export async function listUserRatedComments(userId: string) {
    return usersRepo.getUserRatedComments(userId);
}
