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
        let message = `Статус ${response.status}`;
        try {
            const data = await response.json();
            if (data?.message) {
                message = data.message;
            }
        } catch {}
        throw new Error(message);
    }
    return response.json();
}
