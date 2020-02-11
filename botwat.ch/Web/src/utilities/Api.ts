export class Api {
    public static async Fetch<T>(url: string): Promise<T> {
        return await fetch(url)
            .then(response => {
                    if (response.ok) {
                        return response.json() as Promise<T>
                    } else {
                        throw new Error(response.statusText)
                    }
                }
            )
    }
}