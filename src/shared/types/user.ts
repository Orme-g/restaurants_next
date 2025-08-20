export interface IBlogData {
    blogerName: string;
    blogPosts: string[];
    blogPostsCount: number;
    blogerRating: number;
    aboutMe: string;
    blogAvatar: string;
    blogCity: string;
}

export interface IUserData {
    avatar: string;
    comments: number;
    email: string;
    name: string;
    surname: string;
    registeredAt: Date;
    reviews: number;
    role: string[];
    username: string;
    password: string;
    _id: string;
    birthday: Date;
    reviewedRestaurants: string[];
    favouriteRestaurants: string[][];
    ratedComments: string[];
    rating: number;
    bloger: boolean;
    blogData?: IBlogData;
    ratedBlogPosts: string[];
}
