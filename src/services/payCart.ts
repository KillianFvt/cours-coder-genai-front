import {API_URL} from "../constants.ts";

export const payCart = async () => {
    const response = await fetch(`${API_URL}/shopping/pay/`, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
    });

    return response.ok;
}