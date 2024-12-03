import {CartItem} from "./CartItem.ts";

export type Cart = {
    id: string;
    user: string;
    created_at: string;
    is_paid: boolean;
    items: CartItem[];
}