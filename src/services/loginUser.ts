import {API_URL} from "../constants";
import {fetchUser} from "./fetchUser";
import {User} from "../types/User";

interface loginResponse {
    success: boolean,
    data: any
}

export const loginUser = async (email: string, password: string) : Promise<loginResponse> => {
    const response: Response = await fetch(`${API_URL}/auth/login/`, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "username": email,
            "password": password,
        }),
    });

    if (response.ok) {

        const user: User | null = await fetchUser();

        return {
            'success': true,
            'data': user,
        };
    } else {
        return {
            'success': false,
            'data': await response.json()
        }
    }
};