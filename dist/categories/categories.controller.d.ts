import { CategoriesService } from "./categories.service";
import { CreateCategorieDto } from "./categorie.dto";
export declare class CategoriesController {
    private readonly categories;
    constructor(categories: CategoriesService);
    resetCategories(): Promise<string>;
    getCategories(): Promise<import("./categories.entity").Categories[]>;
    createDbCategorie(categorie: Partial<CreateCategorieDto>): Promise<Partial<import("./categories.entity").Categories> & import("./categories.entity").Categories>;
    deleteCategory(id: string): Promise<string>;
}
