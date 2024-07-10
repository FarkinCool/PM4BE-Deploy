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
exports.OrdersController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const orders_service_1 = require("./orders.service");
const orders_dto_1 = require("./orders.dto");
const auth_guard_1 = require("../auth/guards/auth.guard");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../decorators/roles.decorator");
const user_roles_1 = require("../users/user.roles");
const roles_guard_1 = require("../auth/guards/roles.guard");
let OrdersController = class OrdersController {
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    getOrder(id) {
        return this.ordersService.getOrder(id);
    }
    addOrder(order) {
        const { userId, products } = order;
        return this.ordersService.addOrder(userId, products);
    }
    deleteOrder(id) {
        return this.ordersService.deleteOrder(id);
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'list only one Order by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', required: true, description: 'ID Order', example: '1121qwewasd-qw54wqeqwe-45121' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Order found successfuly :)' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order not found :(' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    openapi.ApiResponse({ status: 200, type: require("./orders.entity").Orders }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "getOrder", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Add a new Order' }),
    (0, swagger_1.ApiBody)({ type: orders_dto_1.CreateOrderDto,
        examples: {
            example: {
                summary: "Example by a new order",
                value: {
                    "userId": "a1032837-05ac-4343-afd4-86dd8101e",
                    "products": [
                        {
                            "id": "d43f30-6d02-4430-bea4-2a444c3476db"
                        },
                        {
                            "id": "100aa9cc-31d3-406a-a3e4-5ee3ec4446c2"
                        }
                    ]
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Order created successfully :)' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'The format used is incorrect :(' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order not created :(' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    openapi.ApiResponse({ status: 201, type: [require("./orders.entity").Orders] }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [orders_dto_1.CreateOrderDto]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "addOrder", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete of one order by Id' }),
    (0, swagger_1.ApiParam)({ name: 'id', required: true, description: 'ID Order', example: '1121qwewasd-qw54wqeqwe-45121' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Order deleted sucessfuly :)' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'You dont have privilegies for the request :)' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Not authorized :(' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)(user_roles_1.Role.Admin),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "deleteOrder", null);
exports.OrdersController = OrdersController = __decorate([
    (0, swagger_1.ApiTags)('orders'),
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersController);
//# sourceMappingURL=orders.controller.js.map