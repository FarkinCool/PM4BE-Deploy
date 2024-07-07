"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModule = void 0;
const common_1 = require("@nestjs/common");
const products_controller_1 = require("./products.controller");
const products_repository_1 = require("./products.repository");
const products_db_service_1 = require("./products-db.service");
const typeorm_1 = require("@nestjs/typeorm");
const products_entity_1 = require("./products.entity");
const categories_service_1 = require("../categories/categories.service");
const categories_entity_1 = require("../categories/categories.entity");
const orders_entity_1 = require("../orders/orders.entity");
const users_entity_1 = require("../users/users.entity");
const orderDetails_entity_1 = require("../orderDetails/orderDetails.entity");
let ProductsModule = class ProductsModule {
};
exports.ProductsModule = ProductsModule;
exports.ProductsModule = ProductsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([products_entity_1.Products, categories_entity_1.Categories, orders_entity_1.Orders, users_entity_1.User, orderDetails_entity_1.OrderDetails])],
        controllers: [products_controller_1.ProductsController],
        providers: [products_db_service_1.ProductsDbService, categories_service_1.CategoriesService, products_repository_1.ProductsRepository],
        exports: [typeorm_1.TypeOrmModule.forFeature([products_entity_1.Products])]
    })
], ProductsModule);
//# sourceMappingURL=products.module.js.map