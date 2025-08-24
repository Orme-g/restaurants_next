export async function fetchRestaurants() {
    const restaurants = await fetch("api/restaurants");
    return restaurants.json();
}
