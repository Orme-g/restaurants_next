function calculateStatus(rating: number): string {
    if (rating < 30) {
        return "Первые шаги";
    } else if (rating >= 30 && rating <= 100) {
        return "Блогер";
    } else if (rating > 100) {
        return "Топ Блогер";
    } else {
        return "Вычисляем...";
    }
}
export default calculateStatus;
