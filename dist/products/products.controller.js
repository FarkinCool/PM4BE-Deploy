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
exports.ProductsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/guards/auth.guard");
const products_db_service_1 = require("./products-db.service");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../decorators/roles.decorator");
const user_roles_1 = require("../users/user.roles");
const products_dto_1 = require("./products.dto");
const swagger_1 = require("@nestjs/swagger");
let ProductsController = class ProductsController {
    constructor(productDbService) {
        this.productDbService = productDbService;
    }
    getDbProducts(page, limit) {
        !page ? page = '1' : page;
        !limit ? limit = '5' : limit;
        return this.productDbService.getDbProducts(Number(page), Number(limit));
    }
    resetProducts() {
        return this.productDbService.resetProducts();
    }
    getDbProductById(id) {
        return this.productDbService.getDbProductById(id);
    }
    createDbProduct(product) {
        return this.productDbService.createDbProduct(product);
    }
    updateDbProduct(id, product) {
        return this.productDbService.updateDbProduct(id, product);
    }
    deleteDbProduct(id) {
        return this.productDbService.deleteDbProduct(id);
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'List all products' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: true, description: 'Page number', example: '1' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: true, description: 'Number of items per page', example: '5' }),
    (0, swagger_1.ApiResponse)({ status: 206, description: 'List of Products as requested :)' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'There are not products :(' }),
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("./products.entity").Products] }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "getDbProducts", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Reset of list of products' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of Products were reset :)' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Fail to reset of products seeder :(' }),
    (0, common_1.Get)('seeder'),
    openapi.ApiResponse({ status: 200, type: String }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "resetProducts", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'list only one product by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', required: true, description: 'ID product', example: '1121qwewasd-qw54wqeqwe-45121' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Product found successfuly :)' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found :(' }),
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./products.entity").Products }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "getDbProductById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Created a new product' }),
    (0, swagger_1.ApiBody)({ type: products_dto_1.CreateProductDto,
        examples: {
            example: {
                summary: "Example of registering a new product",
                value: {
                    "name": 'Produc testMonitor',
                    "description": 'product more efficient in the world',
                    "price": 180.99,
                    "stock": 12,
                    "categoryId": '40899326-b545-430c-a92f-a6e3fbdb1b0e',
                    "imgUrl": 'https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg'
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'product created successfully :)' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'The format used is incorrect :(' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'product not created :(' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    openapi.ApiResponse({ status: 201, type: String }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [products_dto_1.CreateProductDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "createDbProduct", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Edit data of product by Id' }),
    (0, swagger_1.ApiParam)({ name: 'id', required: true, description: 'ID product', example: '1121qwewasd-qw54wqeqwe-45121' }),
    (0, swagger_1.ApiBody)({ type: products_dto_1.CreateProductDto,
        examples: {
            example: {
                summary: "Example of registering a new product",
                value: {
                    "name": 'Produc testMonitor',
                    "description": 'product more efficient in the world',
                    "price": 180.99,
                    "stock": 12,
                    "category": 'monitor',
                    "imgUrl": 'https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg',
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Product updated successfully :)' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'The format used is incorrect :(' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'product not was updated :(' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)(user_roles_1.Role.Admin),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "updateDbProduct", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete of one product by Id' }),
    (0, swagger_1.ApiParam)({ name: 'id', required: true, description: 'ID product', example: '1121qwewasd-qw54wqeqwe-45121' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Product deleted successfully :)' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not was eliminated  :(' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "deleteDbProduct", null);
exports.ProductsController = ProductsController = __decorate([
    (0, swagger_1.ApiTags)('products'),
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_db_service_1.ProductsDbService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map