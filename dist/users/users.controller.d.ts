import { UsersDbService } from "./users-db.service";
import { UpdateUserDto } from "./users.updateDto";
export declare class UsersController {
    private readonly userDbService;
    constructor(userDbService: UsersDbService);
    getDbUsers(page: string, limit: string): Promise<import("./users.entity").User[]>;
    getDbUserbyId(id: string): Promise<import("./users.entity").User>;
    updateDbUser(id: string, user: UpdateUserDto): Promise<string>;
    deleteUser(id: string): Promise<string>;
}
