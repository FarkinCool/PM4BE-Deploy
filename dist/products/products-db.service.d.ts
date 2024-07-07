import { Products } from "./products.entity";
import { Repository } from "typeorm";
import { ProductsRepository } from "./products.repository";
export declare class ProductsDbService {
    private readonly productsDbRepository;
    private readonly productsRepository;
    constructor(productsDbRepository: Repository<Products>, productsRepository: ProductsRepository);
    createDbProduct(product: Partial<Products>): Promise<string>;
    getDbProducts(page: number, limit: number): Promise<Products[]>;
    getDbProductById(id: string): Promise<Products>;
    updateDbProduct(id: string, product: Partial<Products>): Promise<string>;
    deleteDbProduct(id: string): Promise<string>;
    addProducts(): Promise<string>;
    resetProducts(): Promise<string>;
}
