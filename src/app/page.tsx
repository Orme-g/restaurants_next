import Link from "next/link";

async function fetchData() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const result = await res.json();
    return result;
}
async function fetchDataWithParams(sortType: string, limit: number) {
    const params = new URLSearchParams({ limit: limit.toString() });
    const res = await fetch(
        `http://localhost:3000/api/restaurants/sorted-restaurants/${sortType}?${params}`
    );
    const data = await res.json();
    return data;
}
interface IData {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export default async function Home() {
    const fetchedData: IData[] = await fetchData();
    if (!fetchedData) {
        return;
    }
    const sortedData = await fetchDataWithParams("cheap", 6);
    const toDisplay = fetchedData?.map(({ title, body, id }) => {
        return (
            <div key={id}>
                <p>Title:{title}</p>
                <p>Body: {body}</p>
                <Link href={`/post/${id}`}>Подробнее...</Link>
            </div>
        );
    });

    return (
        <>
            <div>Hi, Im starting to study Next JS</div>
            {toDisplay}
        </>
    );
}

// async function fetchDataWithParam(sortType: string, limit: string) {
//     const params = new URLSearchParams({ limit: limit });

//     const res = await fetch(
//         `/api/restaurants/sorted-restaurants/${encodeURIComponent(sortType)}?${params}`
//     );

//     if (!res.ok) {
//         throw new Error("Failed to fetch restaurants");
//     }

//     return res.json();
// }
