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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeederService = void 0;
const common_1 = require("@nestjs/common");
const categories_service_1 = require("../categories/categories.service");
const products_db_service_1 = require("../products/products-db.service");
let SeederService = class SeederService {
    constructor(categoryDbService, productsDbService) {
        this.categoryDbService = categoryDbService;
        this.productsDbService = productsDbService;
    }
    async seedData() {
        const categories = await this.categoryDbService.addCategories();
        const products = await this.productsDbService.addProducts();
    }
};
exports.SeederService = SeederService;
exports.SeederService = SeederService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService,
        products_db_service_1.ProductsDbService])
], SeederService);
//# sourceMappingURL=seeder.service.js.map