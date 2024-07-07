import { OrderDetails } from "src/orderDetails/orderDetails.entity";
import { User } from "src/users/users.entity";
export declare class Orders {
    id: string;
    date: string;
    user: User;
    orderDetails: OrderDetails;
}
