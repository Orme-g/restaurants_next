import * as usersRepo from "../repositories/users.repo";

import bcrypt from "bcrypt";

export const runtime = "nodejs";

export async function getUserById(userId: string) {
    const user = await usersRepo.findUserById(userId);
    if (!user) {
        throw new Error("Пользователь не найден");
    }
    return user;
}

export async function getUserProfileData(userId: string) {
    const user = await usersRepo.findUserById(userId);
    if (!user) {
        throw new Error("Пользователь не найден");
    }
    return {
        avatar: user.avatar,
        name: user.name,
        username: user.username,
        email: user.email,
        comments: user.comments,
        reviews: user.reviews,
        favouriteRestaurants: user.favouriteRestaurants,
        createdAt: user.createdAt,
    };
}

export async function getUserBlogData(userId: string) {
    const user = await usersRepo.findUserById(userId);
    if (!user) {
        throw new Error("Пользователь не найден");
    }
    return user.blogData;
}
// export async function getUserAuthData(userId: string) {
//     const user = await usersRepo.findUserById(userId);
//     if (!user) {
//         throw new Error("Пользователь не найден");
//     }
//     return { name: user.name, username: user.username, id: user._id, role: user.role };
// }

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

export async function changeUserPassword(userId: string, oldPass: string, newPass: string) {
    const user = await usersRepo.findUserById(userId);
    if (!user) {
        throw new Error("Пользователь не найден");
    }
    const checkPassword = await bcrypt.compare(oldPass, user.password);
    if (!checkPassword) {
        throw new Error("Неверный пароль");
    }
    const hashPassword = await bcrypt.hash(newPass, 10);
    const updatedUser = await usersRepo.setUserNewPassword(userId, hashPassword);
    if (!updatedUser) {
        throw new Error("Не удалось обновить пароль");
    }
    return "Success";
}
