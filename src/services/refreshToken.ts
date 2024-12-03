import {API_URL} from "../constants";

export const refreshToken = async () : Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/auth/refresh/`, {
            method: 'POST',
            credentials: 'include',
        });
        return response.ok;
    } catch {
        return false;
    }
};