import { User } from "./users.entity";
import { Repository } from "typeorm";
export declare class UsersDbService {
    private readonly usersDbRepository;
    constructor(usersDbRepository: Repository<User>);
    createDbUser(user: Omit<User, 'id' | 'orders'>): Promise<User>;
    getDbUsers(page: number, limit: number): Promise<User[]>;
    getDbUserbyId(id: string): Promise<User>;
    updateDbUser(id: string, user: Partial<User>): Promise<string>;
    deleteDbUser(id: string): Promise<string>;
    getUserDbByEmail(email: string): Promise<User>;
}
