import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { ProductsRepository } from "./products.repository";
import { ProductsDbService } from "./products-db.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Products } from "./products.entity";
import { CategoriesService } from "src/categories/categories.service";
import { Categories } from "src/categories/categories.entity";
import { Orders } from "src/orders/orders.entity";
import { OrdersRepository } from "src/orders/orders.repository";
import { UsersRepository } from "src/users/users.repository";
import { UsersDbService } from "src/users/users-db.service";
import { User } from "src/users/users.entity";
import { OrderDetails } from "src/orderDetails/orderDetails.entity";

@Module({
    imports:[TypeOrmModule.forFeature([Products,Categories,Orders,User,OrderDetails])],
    controllers:[ProductsController],
    providers: [ProductsDbService, CategoriesService, ProductsRepository],
    exports: [TypeOrmModule.forFeature([Products])]

})
export class ProductsModule{
    
}