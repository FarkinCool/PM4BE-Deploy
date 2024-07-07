import { Categories } from "./categories.entity";
import { Repository } from "typeorm";
export declare class CategoriesService {
    private readonly categoriesDbRepository;
    constructor(categoriesDbRepository: Repository<Categories>);
    createDbCategorie(categorie: Partial<Categories>): Promise<Partial<Categories> & Categories>;
    getCategories(): Promise<Categories[]>;
    addCategories(): Promise<string>;
    resetCategories(): Promise<string>;
    deleteCategory(id: string): Promise<string>;
}
