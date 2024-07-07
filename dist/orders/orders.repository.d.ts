import { User } from "src/users/users.entity";
import { Repository } from "typeorm";
import { Orders } from "./orders.entity";
import { Products, Products as ProductsEntity } from "src/products/products.entity";
import { OrderDetails } from "src/orderDetails/orderDetails.entity";
export declare class OrdersRepository {
    private readonly userDbRepository;
    private readonly ordersDbRepository;
    private readonly productsDbRepository;
    private readonly ordersDbDetail;
    constructor(userDbRepository: Repository<User>, ordersDbRepository: Repository<Orders>, productsDbRepository: Repository<Products>, ordersDbDetail: Repository<OrderDetails>);
    addOrder(userId: string, products: ProductsEntity[]): Promise<Orders[]>;
    getOrder(id: string): Promise<Orders>;
}
