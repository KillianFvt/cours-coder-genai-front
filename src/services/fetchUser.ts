import {API_URL} from "../constants";
import {User} from "../types/User";


export const fetchUser = async () : Promise<User | null> => {
    try {
        const response = await fetch(`${API_URL}/auth/current/`, {
            method: 'GET',
            credentials: 'include',
        });
        if (response.ok) {
            const data = await response.json();
            return {
                id: data.id,
                username: data.username,
                email: data.email,
                firstName: data.first_name,
                lastName: data.last_name,
            };
        } else {
            console.error('fetchUser error:', await response.json());
            return null;
        }
    } catch (error) {
        console.error('fetchUser error:', error);
        return null;
    }
}