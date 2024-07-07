import { Orders } from "src/orders/orders.entity";
import { Products } from "src/products/products.entity";
export declare class OrderDetails {
    id: string;
    price: number;
    orders: Orders;
    products: Products[];
}
