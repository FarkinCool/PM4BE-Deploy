import { Orders } from "src/orders/orders.entity";
export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: number;
    country: string;
    address: string;
    city: string;
    status: boolean;
    isAdmin: boolean;
    orders: Orders[];
}
