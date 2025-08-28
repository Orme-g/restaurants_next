export async function fetchWithAutoRefresh(url: string, options?: RequestInit) {
    let response = await fetch(url, { ...options, credentials: "include" });
    if (response.status === 401) {
        const refreshToken = await fetch("/api/auth/refresh", {
            method: "POST",
            credentials: "include",
        });
        if (!refreshToken) {
            throw new Error("Unauthorized");
        }
        response = await fetch(url, { ...options, credentials: "include" });
    }
    return response;
}
