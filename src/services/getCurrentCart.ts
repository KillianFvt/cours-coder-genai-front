import {API_URL} from "../constants.ts";

export const getCurrentCart = async () => {
    const response = await fetch(`${API_URL}/shopping/carts/current/`, {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    } else {


        const data = await response.json();

        // get all the quantities of the items in the cart and sum them
        let totalItems = 0;
        data.items.forEach((item: any) => {
            totalItems += item.quantity;
        });

        // add the totalItems to the data object
        data.totalItems = totalItems;

        return data;
    }
}

/*
* {
	"id": 1,
	"user": "moi@test.fr",
	"created_at": "2024-11-15T13:15:58.965377Z",
	"is_paid": false,
	"items": [
		{
			"id": 3,
			"product": {
				"id": 1,
				"name": "Apple",
				"description": "",
				"price": "1.34",
				"stock": 87
			},
			"quantity": 4
		},
		{
			"id": 4,
			"product": {
				"id": 3,
				"name": "Cable",
				"description": "HDMI 2.0",
				"price": "12.00",
				"stock": 119
			},
			"quantity": 5
		}
	]
}*/