import { BadRequestException, Body, Controller, Get, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./auth.dto";
import { CreateUserDto } from "src/users/users.dto";
import { DeletePasswordInterceptor } from "src/interceptors/deletePass.interceptor";
import { ApiBody, ApiExcludeEndpoint, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "./guards/auth.guard";

@ApiTags('auth')
@Controller('auth')
export class AuthController{
    constructor (private readonly authService: AuthService){}

    @ApiOperation({summary: 'Login of user'})
    @ApiBody({type: LoginUserDto,
        examples: {
            example:{
                summary:"Example of login of user",
                value: {
                    "email": "alice.jones@example.com",
                    "password": "Alice123+"
                  }
            }
        }
    })
    @ApiResponse({ status: 200, description: 'Logued successfully :)'})
    @ApiResponse({ status: 400, description: 'Credentials used are incorrect :('})
    @Post('signin')
    signIn(@Body() credentials: LoginUserDto ){
        const {email, password} = credentials;
        return this.authService.signIn(email,password);
    }

    @ApiOperation({summary: 'Register of user'})
    @ApiBody({type: CreateUserDto,
        examples: {
            example:{
                summary:"Example of registering a new user",
                value:{
                    "email": "alice.jones@example.com",
                    "name": "Alice Jones",
                    "password": "Alice123+",
                    "confirmpassword": "Alice123+",
                    "address": "789 Oak St",
                    "phone": 112233445,
                    "country": "Canada",
                    "city": "Toronto"                  
                }
            }
        }
    })
    @ApiResponse({ status: 200, description: 'user created successfully :)'})
    @ApiResponse({ status: 400, description: 'The format used is incorrect :('})
    @Post('signup')
    @UseInterceptors(DeletePasswordInterceptor)
    signUp(@Body() user: CreateUserDto){
        return this.authService.signUp(user);
    }

    @ApiExcludeEndpoint()
    @Get()
    getAuth(){
        return this.authService.getAuth();
    }
    
}

