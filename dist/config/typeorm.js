"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionSource = exports.typeOrmConfig = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const config_1 = require("@nestjs/config");
(0, dotenv_1.config)({ path: '.development.env' });
const config = {
    type: 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USENAME,
    password: process.env.DB_PASSWORD,
    autoLoadEntities: true,
    logging: ["query", "error"],
    dropSchema: false,
    synchronize: false,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
};
exports.typeOrmConfig = (0, config_1.registerAs)('typeorm', () => config);
exports.connectionSource = new typeorm_1.DataSource(config);
//# sourceMappingURL=typeorm.js.map