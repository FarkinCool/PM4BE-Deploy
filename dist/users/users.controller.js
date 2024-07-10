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
exports.UsersController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/guards/auth.guard");
const deletePass_interceptor_1 = require("../interceptors/deletePass.interceptor");
const users_db_service_1 = require("./users-db.service");
const users_dto_1 = require("./users.dto");
const roles_decorator_1 = require("../decorators/roles.decorator");
const user_roles_1 = require("./user.roles");
const roles_guard_1 = require("../auth/guards/roles.guard");
const swagger_1 = require("@nestjs/swagger");
const users_updateDto_1 = require("./users.updateDto");
let UsersController = class UsersController {
    constructor(userDbService) {
        this.userDbService = userDbService;
    }
    getDbUsers(page, limit) {
        !page ? page = '1' : page;
        !limit ? limit = '5' : limit;
        return this.userDbService.getDbUsers(Number(page), Number(limit));
    }
    getDbUserbyId(id) {
        return this.userDbService.getDbUserbyId(id);
    }
    updateDbUser(id, user) {
        return this.userDbService.updateDbUser(id, user);
    }
    deleteUser(id) {
        return this.userDbService.deleteDbUser(id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'List all users' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: true, description: 'Page number', example: '1' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: true, description: 'Number of items per page', example: '5' }),
    (0, swagger_1.ApiResponse)({ status: 206, description: 'List of Users as requested :)' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'You dont have privilegies for the request :)' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Not authorized :(' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(user_roles_1.Role.Admin),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.UseInterceptors)(deletePass_interceptor_1.DeletePasswordInterceptor),
    openapi.ApiResponse({ status: 200, type: [require("./users.entity").User] }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getDbUsers", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'List only one user by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', required: true, description: 'ID user', example: '1121qwewasd-qw54wqeqwe-45121' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User found successfuly :)' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Not authorized :(' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Validation failed :(' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(':id'),
    (0, common_1.UseInterceptors)(deletePass_interceptor_1.DeletePasswordInterceptor),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    openapi.ApiResponse({ status: 200, type: require("./users.entity").User }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getDbUserbyId", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Created a new product' }),
    (0, swagger_1.ApiParam)({ name: 'id', required: true, description: 'ID user', example: '1121qwewasd-qw54wqeqwe-45121' }),
    (0, swagger_1.ApiBody)({ type: users_dto_1.CreateUserDto,
        examples: {
            example: {
                summary: "Example of registering a new product",
                value: {
                    "password": "Alice123+",
                    "confirmpassword": "Alice123+",
                    "address": "789 Oak St",
                    "phone": 112233445,
                    "country": "Canada",
                    "city": "Toronto"
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'user updated successfully :)' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'The format used is incorrect :(' }),
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, users_updateDto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateDbUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete of one user by Id' }),
    (0, swagger_1.ApiParam)({ name: 'id', required: true, description: 'ID user', example: '1121qwewasd-qw54wqeqwe-45121' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User was eliminated :)' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Validation failed  :(' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "deleteUser", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_db_service_1.UsersDbService])
], UsersController);
//# sourceMappingURL=users.controller.js.map