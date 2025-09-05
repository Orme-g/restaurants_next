import "server-only";
import Article from "../models/article.schema";
import type { TArticle } from "../models/article.types";

export async function findAllDonerArticles(): Promise<TArticle[]> {
    return Article.find().sort({ createdAt: -1 }).lean<TArticle[]>();
}
export async function findArticleById(id: string): Promise<TArticle | null> {
    return Article.findById(id).lean<TArticle>();
}
