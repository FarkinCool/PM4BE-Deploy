import { OrdersRepository } from "./orders.repository";
import { Products } from "src/products/products.entity";
export declare class OrdersService {
    private readonly ordersRepository;
    constructor(ordersRepository: OrdersRepository);
    addOrder(userId: string, products: Omit<Products[], 'id'>): Promise<import("./orders.entity").Orders[]>;
    getOrder(id: string): Promise<import("./orders.entity").Orders>;
}
