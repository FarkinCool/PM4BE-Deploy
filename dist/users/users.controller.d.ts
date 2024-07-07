import { UsersDbService } from "./users-db.service";
import { CreateUserDto } from "./users.dto";
export declare class UsersController {
    private readonly userDbService;
    constructor(userDbService: UsersDbService);
    getDbUsers(page: string, limit: string, request: any): Promise<import("./users.entity").User[]>;
    getDbUserbyId(id: string, request: any): Promise<import("./users.entity").User>;
    updateDbUser(id: string, user: Partial<CreateUserDto>): Promise<string>;
    deleteUser(id: string): Promise<string>;
}
