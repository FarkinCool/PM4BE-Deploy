import { AuthService } from "./auth.service";
import { LoginUserDto } from "./auth.dto";
import { CreateUserDto } from "src/users/users.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(credentials: LoginUserDto): Promise<{
        message: string;
        token: string;
    }>;
    signUp(user: CreateUserDto): Promise<import("../users/users.entity").User>;
    getAuth(): string;
}
