export interface IArticle {
    _id: string;
    name: string;
    subtitle: string;
    title_image: string;
    short_description: string;
    content: { [key: string]: string | string[] }[];
    createdAt: Date;
    updatedAt: Date;
    author: string;
    rating: number;
}
