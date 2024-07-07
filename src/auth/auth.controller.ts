import { BadRequestException, Body, Controller, Get, Post, UseInterceptors } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./auth.dto";
import { CreateUserDto } from "src/users/users.dto";
import { DeletePasswordInterceptor } from "src/interceptors/deletePass.interceptor";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('auth')
@Controller('auth')
export class AuthController{
    constructor (private readonly authService: AuthService) {}
    @Get()
    getAuth(){
        return this.authService.getAuth();
    }

    @Post('signin')
    signIn(@Body() credentials: LoginUserDto ){
        const {email, password} = credentials;
        return this.authService.signIn(email,password);
    }

    @Post('signup')
    @UseInterceptors(DeletePasswordInterceptor)
    signUp(@Body() user: CreateUserDto){
        return this.authService.signUp(user);

    }
    
}

