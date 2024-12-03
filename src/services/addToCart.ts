import {API_URL} from "../constants.ts";

export const addToCart = async (id: string) => {
    const response: Response = await fetch(`${API_URL}/shopping/cart/add/${id}/`, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
    });

    return response.ok;
}