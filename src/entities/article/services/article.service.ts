import * as articleRepo from "../repositories/article.repo";

export async function getAllDonerArticles() {
    return articleRepo.findAllDonerArticles();
}
export async function getArticleById(id: string) {
    return articleRepo.findArticleById(id);
}
