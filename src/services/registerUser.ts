import { API_URL } from "../constants";

interface RegisterUserProps {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
}

export const registerUser = async ({ email, password, firstName, lastName }: RegisterUserProps) => {
    const response: Response = await fetch(`${API_URL}/auth/register/`, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "email": email,
            "password": password,
            "first_name": firstName,
            "last_name": lastName,
        }),
    });

    if (response.ok) {
        return {
            'success': true,
            'data': await response.json()
        };
    } else {
        return {
            'success': false,
            'data': await response.json()
        }
    }
}