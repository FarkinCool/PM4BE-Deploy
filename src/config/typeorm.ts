import {DataSource, DataSourceOptions} from "typeorm";
import {config as dotenvConfig} from 'dotenv';
import {registerAs } from '@nestjs/config';

dotenvConfig({path: '.development.env'});
const config= {
type:'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    //host: 'postgresdb',
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USENAME,
    password: process.env.DB_PASSWORD,
    autoLoadEntities:true,
    logging: ["query", "error"], 
    dropSchema: false, // false produccion
    synchronize: false, // false produccion
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],

};
export const typeOrmConfig = registerAs('typeorm', () => config );
export const connectionSource = new DataSource(config as DataSourceOptions);