"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const categories_entity_1 = require("./categories.entity");
const typeorm_2 = require("typeorm");
const archivo_utils_1 = require("../utils/archivo.utils");
let CategoriesService = class CategoriesService {
    constructor(categoriesDbRepository) {
        this.categoriesDbRepository = categoriesDbRepository;
    }
    async createDbCategorie(categorie) {
        const { name } = categorie;
        const foundCategorie = await this.categoriesDbRepository.findOneBy({ name });
        console.log(foundCategorie);
        if (foundCategorie)
            throw new common_1.BadRequestException("Category already exists");
        return this.categoriesDbRepository.save(categorie);
    }
    async getCategories() {
        return await this.categoriesDbRepository.find();
    }
    async addCategories() {
        const categoriesName = await new Set(archivo_utils_1.dataProducts.map(cat => cat.category));
        const listCategories = Array.from(categoriesName);
        if (listCategories.length === 0)
            throw new common_1.NotFoundException("There not registers in categories Data");
        for (const name of listCategories) {
            const foundCategories = await this.categoriesDbRepository.findOne({ where: { name } });
            if (!foundCategories) {
                const savePromises = listCategories.map(async (ele) => {
                    const category = new categories_entity_1.Categories();
                    category.name = ele;
                    console.log('Saving category:', category);
                    await this.categoriesDbRepository.save(category);
                });
                await Promise.all(savePromises);
            }
            else {
                console.log("categories already exists, skipping...");
            }
        }
        return "Categories reload";
    }
    async resetCategories() {
        const categoriesName = await new Set(archivo_utils_1.dataProducts.map(cat => cat.category));
        const skipCategories = new Set();
        for (const datacategory of archivo_utils_1.dataProducts) {
            const foundCategory = await this.categoriesDbRepository.findOne({ where: { name: datacategory.category } });
            if (foundCategory) {
                skipCategories.add(foundCategory);
            }
        }
        const resetCategories = archivo_utils_1.dataProducts.filter((ele) => !skipCategories.has(ele.category));
        for (const ele of resetCategories) {
            const categorieToUpdate = await this.categoriesDbRepository.findOne({ where: { name: ele.category } });
            if (categorieToUpdate) {
                categorieToUpdate.name = ele.category;
                categorieToUpdate.status = true;
                await this.categoriesDbRepository.save(categorieToUpdate);
            }
            else {
                const newCategorie = new categories_entity_1.Categories();
                newCategorie.name = ele.category;
                categorieToUpdate.status = true;
                await this.categoriesDbRepository.save(newCategorie);
            }
        }
        return "Categories were updating....";
    }
    async deleteCategory(id) {
        const foundCategorie = await this.categoriesDbRepository.findOneBy({ id });
        if (!foundCategorie)
            throw new common_1.NotFoundException("this category not found");
        if (foundCategorie.status === false)
            throw new common_1.ConflictException("category is not available");
        await this.categoriesDbRepository.update(id, { status: false });
        return id;
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(categories_entity_1.Categories)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map