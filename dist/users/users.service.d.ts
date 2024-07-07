import { UsersRepository } from "./users.repository";
import IUsersData from "src/interfaces/IUsers";
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    getUsers(page: number, limit: number): Promise<string | IUsersData[]>;
    getUserById(id: number): Promise<IUsersData>;
    createUser(user: IUsersData): Promise<number>;
    updateUser(id: number, user: IUsersData): Promise<number>;
    deleteUser(id: number): Promise<number>;
}
