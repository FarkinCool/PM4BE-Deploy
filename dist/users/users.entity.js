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
exports.User = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const orders_entity_1 = require("../orders/orders.entity");
const typeorm_1 = require("typeorm");
let User = class User {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String, description: "uuid v4 generado por la BBDD" }, name: { required: true, type: () => String, description: "Debe ingresar un string, no nulo, de 50 caracteres como maximo; para los nombres(Nombre Apellido)", example: "Juan Perez" }, email: { required: true, type: () => String, description: "Debe ingresar un string, no nulo, de 50 caracteres como maximo y unico; para un email valido", example: "jperez@mail.com" }, password: { required: true, type: () => String, description: "Debe ingresar un string, para un password de caracter fuerte(1minuscula, 1 mayuscula, 1numero, 1simbolo)", example: "Juan123+" }, phone: { required: true, type: () => Number, description: "Debe ingresar un numero entero, para un telefono", example: 54912345 }, country: { required: true, type: () => String, description: "Debe ingresar un string, de 50 caracteres como maximo; para un pais", example: "New Country" }, address: { required: true, type: () => String, description: "Debe ingresar un string, para un direccion(ubicacion)", example: "Street ELM 123" }, city: { required: true, type: () => String, description: "Debe ingresar un string, de 50 caracteres como maximo; para una ciudad", example: "New City" }, orders: { required: true, type: () => [require("../orders/orders.entity").Orders] } };
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50, nullable: false }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50, nullable: false, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 128, nullable: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50 }),
    __metadata("design:type", String)
], User.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50 }),
    __metadata("design:type", String)
], User.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.Column)({ type: "boolean", default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isAdmin", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orders_entity_1.Orders, (order) => order.user),
    (0, typeorm_1.JoinColumn)({ name: 'order_id' }),
    __metadata("design:type", Array)
], User.prototype, "orders", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)({
        name: 'users',
    })
], User);
//# sourceMappingURL=users.entity.js.map