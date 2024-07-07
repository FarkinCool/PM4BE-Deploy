import { Module } from "@nestjs/common";
import { SeederController } from "./seeder.controller";
import { SeederService } from "./seeder.service";
import { CategoriesService } from "src/categories/categories.service";
import { ProductsDbService } from "src/products/products-db.service";
import { ProductsRepository } from "src/products/products.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Categories } from "src/categories/categories.entity";
import { Products } from "src/products/products.entity";
import { Orders } from "src/orders/orders.entity";


@Module({
    imports:[TypeOrmModule.forFeature([Categories,Products,Orders])],
    controllers:[SeederController],
    providers:[SeederService, CategoriesService, ProductsDbService,ProductsRepository],
})
    
export class SeederModule{}