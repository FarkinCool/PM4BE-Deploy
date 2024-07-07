import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./orders.dto";
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    getOrder(id: string): Promise<import("./orders.entity").Orders>;
    addOrder(order: CreateOrderDto): Promise<import("./orders.entity").Orders[]>;
}
