import { Module } from "@nestjs/common";
import { CategoriesController } from "./categories.controller";
import { CategoriesService } from "./categories.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Categories } from "./categories.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Categories])],
    controllers: [CategoriesController],
    providers: [CategoriesService],
    // exports: [TypeOrmModule.forFeature([Categories])]
})

export class CategoriesModule{

}