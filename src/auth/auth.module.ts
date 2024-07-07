import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersDbService } from "src/users/users-db.service";
import { UsersModule } from "src/users/users.module";


@Module({
    imports:[UsersModule],
    controllers:[AuthController],
    providers:[ AuthService,UsersDbService]
})
export class AuthModule{}