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
exports.Products = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const categories_entity_1 = require("../categories/categories.entity");
const orderDetails_entity_1 = require("../orderDetails/orderDetails.entity");
const typeorm_1 = require("typeorm");
let Products = class Products {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String, description: "uuid v4 generado por la BBDD" }, name: { required: true, type: () => String, description: "Debe ingresar un string, de 50 caracteres como maximo, no nulo e unico, para el nombre de un producto", example: "Logitech G pro" }, description: { required: true, type: () => String, description: "Debe ingresar un string, no nulo; para la descripcion del producto", example: "el mejor teclado" }, price: { required: true, type: () => Number, description: "Debe ingresar un numero decimal, no nulo, con precision 10 y escala a 2; para el precio del producto", example: 96.37 }, stock: { required: true, type: () => Number, description: "Debe ingresar un numero entero, no nulo; para el stock del producto", example: 12 }, imgUrl: { required: true, type: () => String, description: "Campo para la imagen, se subira mediante otra funcion" }, category: { required: true, type: () => require("../categories/categories.entity").Categories }, ordersDetails: { required: true, type: () => [require("../orderDetails/orderDetails.entity").OrderDetails] } };
    }
};
exports.Products = Products;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Products.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50, nullable: false, unique: true }),
    __metadata("design:type", String)
], Products.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Products.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, nullable: false }),
    __metadata("design:type", Number)
], Products.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: false }),
    __metadata("design:type", Number)
], Products.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "default.jpg" }),
    __metadata("design:type", String)
], Products.prototype, "imgUrl", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.Column)({ type: "boolean", default: true }),
    __metadata("design:type", Boolean)
], Products.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => categories_entity_1.Categories, (category) => category.products),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    __metadata("design:type", categories_entity_1.Categories)
], Products.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => orderDetails_entity_1.OrderDetails, (orderDetails) => orderDetails.products),
    __metadata("design:type", Array)
], Products.prototype, "ordersDetails", void 0);
exports.Products = Products = __decorate([
    (0, typeorm_1.Entity)({
        name: 'products'
    })
], Products);
//# sourceMappingURL=products.entity.js.map