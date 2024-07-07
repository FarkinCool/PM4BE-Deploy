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
exports.Categories = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const products_entity_1 = require("../products/products.entity");
const typeorm_1 = require("typeorm");
let Categories = class Categories {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String, description: "uuid v4 generado por la BBDD" }, name: { required: true, type: () => String, description: "Debe ser un string de 50 caracteres como maximo, no nulo e unico; para el nombre de una categoria clase de un producto" }, products: { required: true, type: () => [require("../products/products.entity").Products] } };
    }
};
exports.Categories = Categories;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Categories.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50, nullable: false, unique: true }),
    __metadata("design:type", String)
], Categories.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.Column)({ type: "boolean", default: true }),
    __metadata("design:type", Boolean)
], Categories.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => products_entity_1.Products, (products) => products.category),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Categories.prototype, "products", void 0);
exports.Categories = Categories = __decorate([
    (0, typeorm_1.Entity)({
        name: 'categories',
    })
], Categories);
//# sourceMappingURL=categories.entity.js.map