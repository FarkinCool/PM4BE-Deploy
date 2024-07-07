import IUsersData from "src/interfaces/IUsers";
export declare class UsersRepository {
    getUsers(page: number, limit: number): Promise<IUsersData[] | string>;
    getUserById(id: number): Promise<IUsersData>;
    createUser(user: IUsersData): Promise<number>;
    updateUser(id: number, user: IUsersData): Promise<number>;
    deleteUser(id: number): Promise<number>;
    getUserByEmail(email: string): Promise<IUsersData>;
}
