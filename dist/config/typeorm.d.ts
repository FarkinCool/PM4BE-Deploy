import { DataSource } from "typeorm";
export declare const typeOrmConfig: (() => {
    type: string;
    database: string;
    host: string;
    port: number;
    username: string;
    password: string;
    autoLoadEntities: boolean;
    logging: string[];
    dropSchema: boolean;
    synchronize: boolean;
    entities: string[];
    migrations: string[];
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    type: string;
    database: string;
    host: string;
    port: number;
    username: string;
    password: string;
    autoLoadEntities: boolean;
    logging: string[];
    dropSchema: boolean;
    synchronize: boolean;
    entities: string[];
    migrations: string[];
}>;
export declare const connectionSource: DataSource;
