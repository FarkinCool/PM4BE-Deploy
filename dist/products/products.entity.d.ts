import { Categories } from "src/categories/categories.entity";
import { OrderDetails } from "src/orderDetails/orderDetails.entity";
export declare class Products {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    imgUrl: string;
    status: boolean;
    category: Categories;
    ordersDetails: OrderDetails[];
}
