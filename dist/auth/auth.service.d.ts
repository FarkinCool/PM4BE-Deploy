import { UsersDbService } from "src/users/users-db.service";
import { User } from "src/users/users.entity";
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly usersDbRepository;
    private readonly jwtService;
    constructor(usersDbRepository: UsersDbService, jwtService: JwtService);
    getAuth(): string;
    signUp(user: Omit<User, 'id' | 'orders'>): Promise<User>;
    signIn(email: string, password: string): Promise<{
        message: string;
        token: string;
    }>;
}
