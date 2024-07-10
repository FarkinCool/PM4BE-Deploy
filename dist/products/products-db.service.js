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
exports.ProductsDbService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const products_entity_1 = require("./products.entity");
const typeorm_2 = require("typeorm");
const products_repository_1 = require("./products.repository");
let ProductsDbService = class ProductsDbService {
    constructor(productsDbRepository, productsRepository) {
        this.productsDbRepository = productsDbRepository;
        this.productsRepository = productsRepository;
    }
    async createDbProduct(product) {
        return await this.productsRepository.createDbProduct(product);
    }
    async getDbProducts(page, limit) {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const productlist = (await this.productsDbRepository.find({
            relations: { category: true, }
        })).slice(startIndex, endIndex);
        if (productlist.length !== 0) {
            return productlist;
        }
        else
            throw new common_1.NotFoundException("There are not products");
    }
    async getDbProductById(id) {
        return await this.productsDbRepository.findOne({ where: { id } });
    }
    async updateDbProduct(id, product) {
        await this.productsDbRepository.update(id, product);
        return id;
    }
    async deleteDbProduct(id) {
        const foundProduct = await this.productsDbRepository.findOneBy({ id });
        if (!foundProduct)
            throw new common_1.NotFoundException("this product is not available");
        if (foundProduct.status === false)
            throw new common_1.NotFoundException("this product is not available");
        foundProduct.status = false;
        await this.productsDbRepository.save(foundProduct);
        return id;
    }
    async addProducts() {
        return this.productsRepository.addProducts();
    }
    async resetProducts() {
        return this.productsRepository.resetProductsSeed();
    }
};
exports.ProductsDbService = ProductsDbService;
exports.ProductsDbService = ProductsDbService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(products_entity_1.Products)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        products_repository_1.ProductsRepository])
], ProductsDbService);
//# sourceMappingURL=products-db.service.js.map