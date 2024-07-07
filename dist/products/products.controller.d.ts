import { ProductsDbService } from "./products-db.service";
import { Products as ProductEntity } from "./products.entity";
import { CreateProductDto } from "./products.dto";
export declare class ProductsController {
    private readonly productDbService;
    constructor(productDbService: ProductsDbService);
    getDbProducts(page: string, limit: string): Promise<ProductEntity[]>;
    resetProducts(): Promise<string>;
    getDbProductById(id: string): Promise<ProductEntity>;
    createDbProduct(product: CreateProductDto): Promise<string>;
    updateDbProduct(id: string, product: Partial<CreateProductDto>): Promise<string>;
    deleteDbProduct(id: string): Promise<string>;
}
