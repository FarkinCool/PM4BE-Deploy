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
exports.CategoriesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const categories_service_1 = require("./categories.service");
const categorie_dto_1 = require("./categorie.dto");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../auth/guards/auth.guard");
let CategoriesController = class CategoriesController {
    constructor(categories) {
        this.categories = categories;
    }
    resetCategories() {
        return this.categories.resetCategories();
    }
    getCategories() {
        return this.categories.getCategories();
    }
    createDbCategorie(categorie) {
        return this.categories.createDbCategorie(categorie);
    }
    deleteCategory(id) {
        return this.categories.deleteCategory(id);
    }
};
exports.CategoriesController = CategoriesController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Reset seeder categories' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of Categories were reset :)' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Fail to reset of Categories seeder :(' }),
    (0, common_1.Get)('seeder'),
    openapi.ApiResponse({ status: 200, type: String }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "resetCategories", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'List all Categories' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of Categories :)' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'There are not categories :(' }),
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("./categories.entity").Categories] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "getCategories", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new Categorie' }),
    (0, swagger_1.ApiBody)({ type: categorie_dto_1.CreateCategorieDto,
        examples: {
            example: {
                summary: "Example of registering a new product",
                value: {
                    "name": 'Electronic domestics'
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Category created successfully :)' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'The format used is incorrect :(' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'category not created :(' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "createDbCategorie", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a Categorie' }),
    (0, swagger_1.ApiParam)({ name: 'id', required: true, description: 'ID Category', example: '1121qwewasd-qw54wqeqwe-45121' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Category deleted successfully :)' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Category not was eliminated  :(' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "deleteCategory", null);
exports.CategoriesController = CategoriesController = __decorate([
    (0, swagger_1.ApiTags)('categories'),
    (0, common_1.Controller)('categories'),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService])
], CategoriesController);
//# sourceMappingURL=categories.controller.js.map