import { Products } from "./products.entity";
import { Repository } from "typeorm";
import { Categories } from "src/categories/categories.entity";
import { Orders } from "src/orders/orders.entity";
export declare class ProductsRepository {
    private productsRepository;
    private categoriesRepository;
    private ordersRepository;
    constructor(productsRepository: Repository<Products>, categoriesRepository: Repository<Categories>, ordersRepository: Repository<Orders>);
    addProducts(): Promise<string>;
    resetProductsSeed(): Promise<string>;
}
