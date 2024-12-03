import {API_URL} from "../constants.ts";

export const logoutUser = async () => {
    try {
        const response = await fetch(`${API_URL}/token/logout/`, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
        });

        if (!response.ok) {
            console.error('Logout error:', await response.json());
        } else {
            localStorage.removeItem('user');
            console.log(localStorage.getItem('user'))
        }

    } catch (error) {
        console.error('Logout error:', error);
    }
}