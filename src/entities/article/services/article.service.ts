import * as articleRepo from "../repositories/article.repo";

export async function getAllDonerArticles() {
    return articleRepo.findAllDonerArticles();
}
