import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { OrdersRepository } from "./orders.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/users.entity";
import { Orders } from "./orders.entity";
import { Products } from "src/products/products.entity";
import { OrderDetails } from "src/orderDetails/orderDetails.entity";


@Module({
    imports:[TypeOrmModule.forFeature([User,Orders, Products, OrderDetails])],
    controllers: [OrdersController],
    providers: [OrdersService, OrdersRepository]
})
export class OrdersModule{

}