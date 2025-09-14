export default function transformCoordinates(coordinates: string): number[] {
    return coordinates.split(",").map((item) => +item.trim());
}
