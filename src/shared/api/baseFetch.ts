export async function baseFetch<T>(url: string, options?: RequestInit): Promise<T> {
    let response = await fetch(url, {
        ...options,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
    });
    if (response.status === 401) {
        const refreshToken = await fetch("/api/auth/refresh", {
            method: "POST",
            credentials: "include",
        });
        if (!refreshToken.ok) {
            throw new Error("Unauthorized");
        }
        response = await fetch(url, {
            ...options,
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        });
    }
    if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
    }
    return response.json();
}
