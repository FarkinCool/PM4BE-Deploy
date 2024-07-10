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
exports.AuthController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_dto_1 = require("./auth.dto");
const users_dto_1 = require("../users/users.dto");
const deletePass_interceptor_1 = require("../interceptors/deletePass.interceptor");
const swagger_1 = require("@nestjs/swagger");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    signIn(credentials) {
        const { email, password } = credentials;
        return this.authService.signIn(email, password);
    }
    signUp(user) {
        return this.authService.signUp(user);
    }
    getAuth() {
        return this.authService.getAuth();
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Login of user' }),
    (0, swagger_1.ApiBody)({ type: auth_dto_1.LoginUserDto,
        examples: {
            example: {
                summary: "Example of login of user",
                value: {
                    "email": "alice.jones@example.com",
                    "password": "Alice123+"
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Logued successfully :)' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Credentials used are incorrect :(' }),
    (0, common_1.Post)('signin'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.LoginUserDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Register of user' }),
    (0, swagger_1.ApiBody)({ type: users_dto_1.CreateUserDto,
        examples: {
            example: {
                summary: "Example of registering a new user",
                value: {
                    "email": "alice.jones@example.com",
                    "name": "Alice Jones",
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
    (0, swagger_1.ApiResponse)({ status: 200, description: 'user created successfully :)' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'The format used is incorrect :(' }),
    (0, common_1.Post)('signup'),
    (0, common_1.UseInterceptors)(deletePass_interceptor_1.DeletePasswordInterceptor),
    openapi.ApiResponse({ status: 201, type: require("../users/users.entity").User }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, swagger_1.ApiExcludeEndpoint)(),
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: String }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getAuth", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map