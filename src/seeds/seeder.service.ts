import { Injectable } from "@nestjs/common";
import { CategoriesService } from "src/categories/categories.service";
import { ProductsDbService } from "src/products/products-db.service";

@Injectable()
export class SeederService{
    constructor(
        private readonly categoryDbService: CategoriesService,
        private readonly productsDbService: ProductsDbService
    ) {}

    async seedData(){
        const categories = await this.categoryDbService.addCategories();
        const products = await this.productsDbService.addProducts();
    }



}