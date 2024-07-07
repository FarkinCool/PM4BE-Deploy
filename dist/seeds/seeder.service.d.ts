import { CategoriesService } from "src/categories/categories.service";
import { ProductsDbService } from "src/products/products-db.service";
export declare class SeederService {
    private readonly categoryDbService;
    private readonly productsDbService;
    constructor(categoryDbService: CategoriesService, productsDbService: ProductsDbService);
    seedData(): Promise<void>;
}
