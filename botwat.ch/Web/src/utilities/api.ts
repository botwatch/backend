import {authenticationService} from "../services/authentication.service";

export class Api {

    public static handleResponse(response) {
        return response.text().then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                if ([401, 403].indexOf(response.status) !== -1) {
                    // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                    authenticationService.logout();
                    location.reload(true);
                }

                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            return data;
        });
    }
    
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