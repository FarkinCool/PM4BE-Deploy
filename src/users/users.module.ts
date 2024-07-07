import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { UsersDbService } from "./users-db.service";

@Module({
    imports:[TypeOrmModule.forFeature([User])],
    controllers:[UsersController],
    providers: [ UsersDbService],
    exports:[TypeOrmModule.forFeature([User])]
})
export class UsersModule{
    
}