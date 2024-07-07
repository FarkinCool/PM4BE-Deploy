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
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const products_module_1 = require("./products/products.module");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const typeorm_2 = require("./config/typeorm");
const categories_module_1 = require("./categories/categories.module");
const orders_module_1 = require("./orders/orders.module");
const file_upload_module_1 = require("./file-upload/file-upload.module");
const jwt_1 = require("@nestjs/jwt");
const seeder_module_1 = require("./seeds/seeder.module");
const seeder_service_1 = require("./seeds/seeder.service");
const categories_service_1 = require("./categories/categories.service");
const products_db_service_1 = require("./products/products-db.service");
const products_repository_1 = require("./products/products.repository");
let AppModule = class AppModule {
    constructor(seedService) {
        this.seedService = seedService;
    }
    async onModuleInit() {
        await this.seedService.seedData();
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [typeorm_2.typeOrmConfig]
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => configService.get('typeorm'),
            }),
            products_module_1.ProductsModule, users_module_1.UsersModule, auth_module_1.AuthModule, categories_module_1.CategoriesModule, orders_module_1.OrdersModule, file_upload_module_1.FileUploadModule, seeder_module_1.SeederModule,
            jwt_1.JwtModule.register({
                global: true,
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '60m' },
            })
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, seeder_service_1.SeederService, categories_service_1.CategoriesService, products_db_service_1.ProductsDbService, products_repository_1.ProductsRepository],
    }),
    __metadata("design:paramtypes", [seeder_service_1.SeederService])
], AppModule);
//# sourceMappingURL=app.module.js.map