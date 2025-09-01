import "server-only";
import Article from "../models/article.schema";
import type { IArticle } from "../models/article.types";

export async function findAllDonerArticles(): Promise<IArticle[]> {
    return Article.find().sort({ createdAt: -1 }).lean<IArticle[]>();
}
export async function findArticleById(id: string): Promise<IArticle | null> {
    return Article.findById(id).lean<IArticle>();
}
