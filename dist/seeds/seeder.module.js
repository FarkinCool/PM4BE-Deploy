"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeederModule = void 0;
const common_1 = require("@nestjs/common");
const seeder_controller_1 = require("./seeder.controller");
const seeder_service_1 = require("./seeder.service");
const categories_service_1 = require("../categories/categories.service");
const products_db_service_1 = require("../products/products-db.service");
const products_repository_1 = require("../products/products.repository");
const typeorm_1 = require("@nestjs/typeorm");
const categories_entity_1 = require("../categories/categories.entity");
const products_entity_1 = require("../products/products.entity");
const orders_entity_1 = require("../orders/orders.entity");
let SeederModule = class SeederModule {
};
exports.SeederModule = SeederModule;
exports.SeederModule = SeederModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([categories_entity_1.Categories, products_entity_1.Products, orders_entity_1.Orders])],
        controllers: [seeder_controller_1.SeederController],
        providers: [seeder_service_1.SeederService, categories_service_1.CategoriesService, products_db_service_1.ProductsDbService, products_repository_1.ProductsRepository],
    })
], SeederModule);
//# sourceMappingURL=seeder.module.js.map