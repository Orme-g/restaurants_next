function calculateExperience(reviews: number): string {
    if (reviews < 5) {
        return "Новичок";
    } else if (reviews >= 5 && reviews < 20) {
        return "Знаток";
    } else if (reviews >= 20 && reviews < 50) {
        return "Критик";
    } else if (reviews >= 50) {
        return "Мастер-едок";
    } else {
        return "Едок";
    }
}

export default calculateExperience;
