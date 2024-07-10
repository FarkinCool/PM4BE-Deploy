import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Put, Query, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { DeletePasswordInterceptor } from "src/interceptors/deletePass.interceptor";
import { UsersDbService } from "./users-db.service";
import { CreateUserDto } from "./users.dto";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "./user.roles";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UpdateUserDto } from "./users.updateDto";

@ApiTags('users')
@Controller('users')
export class UsersController{
    constructor(
        private readonly userDbService: UsersDbService     
    ){}

    @ApiOperation({summary: 'List all users'})
    @ApiQuery({ name: 'page', required: true, description: 'Page number', example: '1' })
    @ApiQuery({ name: 'limit', required: true, description: 'Number of items per page', example: '5' })
    @ApiResponse({ status: 206, description: 'List of Users as requested :)'})
    @ApiResponse({ status: 403, description: 'You dont have privilegies for the request :)'})
    @ApiResponse({ status: 401, description: 'Not authorized :('})
    @ApiBearerAuth()
    @Get()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @UseInterceptors(DeletePasswordInterceptor)
    getDbUsers(@Query('page') page:string, @Query('limit') limit:string){
        !page ? page = '1' : page;
        !limit ? limit = '5' : limit;
        return this.userDbService.getDbUsers(Number(page), Number(limit));
    }

    @ApiOperation({summary: 'List only one user by ID'})
    @ApiParam({ name: 'id', required: true, description: 'ID user', example: '1121qwewasd-qw54wqeqwe-45121' })
    @ApiResponse({ status: 200, description: 'User found successfuly :)'})
    @ApiResponse({ status: 401, description: 'Not authorized :('})
    @ApiResponse({ status: 400, description: 'Validation failed :('})
    @ApiBearerAuth()
    @Get(':id')
    @UseInterceptors(DeletePasswordInterceptor)
    @UseGuards(AuthGuard)
    getDbUserbyId(@Param('id', ParseUUIDPipe) id:string ){
        return this.userDbService.getDbUserbyId(id);
    }
    
    @ApiBearerAuth()
    @ApiOperation({summary: 'Created a new product'})
    @ApiParam({ name: 'id', required: true, description: 'ID user', example: '1121qwewasd-qw54wqeqwe-45121' })
    @ApiBody({type: CreateUserDto,
        examples: {
            example:{
                summary:"Example of registering a new product",
                value:{
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
    @ApiResponse({ status: 200, description: 'user updated successfully :)'})
    @ApiResponse({ status: 400, description: 'The format used is incorrect :('})
    @Put(':id')
    @UseGuards(AuthGuard)
    updateDbUser(@Param('id',ParseUUIDPipe) id:string, @Body() user:UpdateUserDto){
        return this.userDbService.updateDbUser(id , user);
    }

    @ApiOperation({summary: 'Delete of one user by Id'})
    @ApiParam({ name: 'id', required: true, description: 'ID user', example: '1121qwewasd-qw54wqeqwe-45121' })
    @ApiResponse({ status: 200, description: 'User was eliminated :)'})
    @ApiResponse({ status: 400, description: 'Validation failed  :('})
    @ApiBearerAuth()
    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteUser(@Param('id', ParseUUIDPipe) id :string){
        return this.userDbService.deleteDbUser(id);
    }























    // @Post()
    // createDbUser(@Body() user: CreateUserDto ){
    //     return this.userDbService.createDbUser(user);
    // }        

    // @Get()
    // @UseInterceptors(DeletePasswordInterceptor)
    // @UseGuards(AuthGuard)
    // getUsers(@Query('page') page:string, @Query('limit') limit:string, @Req() request ){
    //     !page ? page = '1' : page;
    //     !limit ? limit = '5' : limit;
    //     return this.userService.getUsers(Number(page), Number(limit));
    // }

    // @Get(':id')
    // @UseInterceptors(DeletePasswordInterceptor)
    // @UseGuards(AuthGuard)
    // getUserById(@Param('id') id:string, @Req() request  ){
    //     // console.log("dntro del endpoint", request);
    //     return this.userService.getUserById(Number(id));
    // }

    // @Post()
    // createUser(@Body() user: IUsersData){
    //     return this.userService.createUser(user);
    // }

    // @Put(':id')
    // @UseGuards(AuthGuard)
    // updateUser(@Param('id') id:string, @Body() user:IUsersData){
    //     return this.userService.updateUser(Number(id) , user);
    // }

    // @Delete(':id')
    // @UseGuards(AuthGuard)
    // deleteUser(@Param('id') id :string){
    //     return this.userService.deleteUser(Number(id));
    // }


}