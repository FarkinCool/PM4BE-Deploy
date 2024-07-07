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
exports.CreateUserDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const matchPassword_decorator_1 = require("../decorators/matchPassword.decorator");
class CreateUserDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, description: "Debe ser un string de entre 3 y 50 caracteres", example: "Juan Perez", minLength: 3, maxLength: 50 }, email: { required: true, type: () => String, description: "Debe ser un string con formato de email valido", example: "jperez@mail.com" }, password: { required: true, type: () => String, description: "Debe contener entre 8 y 15 caracteres, e incluir al menos una minuscula, una mayuscula, un numero y un simbolo", example: "userPass123+", minLength: 8, maxLength: 15 }, confirmpassword: { required: true, type: () => String, description: "Debe ser iguales con el password", example: "userPass123+" }, address: { required: true, type: () => String, description: "Debe ser un string entre 3 y 50 caracteres", example: "street Elm 153", minLength: 3, maxLength: 50 }, phone: { required: true, type: () => Number, description: "Debe ser un numero", example: 1254894 }, country: { required: true, type: () => String, description: "Debe ser un string entre 3 y 50 caracteres", example: "New Country", minLength: 3, maxLength: 50 }, city: { required: true, type: () => String, description: "Debe ser un string entre 5 y 50 caracteres", example: "New City", minLength: 5, maxLength: 50 } };
    }
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(15),
    (0, class_validator_1.IsStrongPassword)({
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Validate)(matchPassword_decorator_1.MatchPassword, ['password']),
    __metadata("design:type", String)
], CreateUserDto.prototype, "confirmpassword", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateUserDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateUserDto.prototype, "country", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateUserDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsEmpty)(),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsEmpty)(),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "isAdmin", void 0);
//# sourceMappingURL=users.dto.js.map