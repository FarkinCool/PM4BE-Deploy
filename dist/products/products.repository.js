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
exports.ProductsRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const products_entity_1 = require("./products.entity");
const typeorm_2 = require("typeorm");
const categories_entity_1 = require("../categories/categories.entity");
const archivo_1 = require("../utils/archivo");
const orders_entity_1 = require("../orders/orders.entity");
(0, common_1.Injectable)();
let ProductsRepository = class ProductsRepository {
    constructor(productsRepository, categoriesRepository, ordersRepository) {
        this.productsRepository = productsRepository;
        this.categoriesRepository = categoriesRepository;
        this.ordersRepository = ordersRepository;
    }
    async addProducts() {
        const categories = await this.categoriesRepository.find();
        archivo_1.dataProducts?.map(async (ele) => {
            const category = categories.find((category) => category.name === ele.category);
            const product = new products_entity_1.Products();
            product.name = ele.name;
            product.description = ele.description;
            product.price = ele.price;
            product.imgUrl = ele.imgUrl;
            product.stock = ele.stock;
            product.category = category;
            await this.productsRepository
                .createQueryBuilder()
                .insert()
                .into(products_entity_1.Products)
                .values(product)
                .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
                .execute();
        });
        return 'Products reload';
    }
    async resetProductsSeed() {
        const categories = await this.categoriesRepository.find();
        const skipProducts = new Set();
        for (const dataproduct of archivo_1.dataProducts) {
            const foundProduct = await this.productsRepository.findOne({ where: { name: dataproduct.name } });
            if (foundProduct) {
                const foundOrder = await this.ordersRepository.findOne({
                    where: { orderDetails: { products: { id: foundProduct.id } } }
                });
                if (foundOrder) {
                    skipProducts.add(foundProduct.name);
                    continue;
                }
            }
        }
        console.log(skipProducts);
        const resetProducts = archivo_1.dataProducts.filter((ele) => !skipProducts.has(ele.name));
        for (const ele of resetProducts) {
            const category = categories.find((category) => category.name === ele.category);
            const productToUpdate = await this.productsRepository.findOne({ where: { name: ele.name } });
            if (productToUpdate) {
                productToUpdate.name = ele.name;
                productToUpdate.description = ele.description;
                productToUpdate.price = ele.price;
                productToUpdate.imgUrl = ele.imgUrl;
                productToUpdate.stock = ele.stock;
                productToUpdate.category = category;
                productToUpdate.status = true;
                await this.productsRepository.save(productToUpdate);
            }
            else {
                const newproduct = new products_entity_1.Products();
                newproduct.name = ele.name;
                newproduct.description = ele.description;
                newproduct.price = ele.price;
                newproduct.imgUrl = ele.imgUrl;
                newproduct.stock = ele.stock;
                newproduct.category = category;
                await this.productsRepository.save(newproduct);
            }
        }
        return 'Products whitout orders were reset';
    }
};
exports.ProductsRepository = ProductsRepository;
exports.ProductsRepository = ProductsRepository = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(products_entity_1.Products)),
    __param(1, (0, typeorm_1.InjectRepository)(categories_entity_1.Categories)),
    __param(2, (0, typeorm_1.InjectRepository)(orders_entity_1.Orders)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ProductsRepository);
//# sourceMappingURL=products.repository.js.map