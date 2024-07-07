import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Put, Query, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { DeletePasswordInterceptor } from "src/interceptors/deletePass.interceptor";
import { UsersDbService } from "./users-db.service";
import { CreateUserDto } from "./users.dto";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "./user.roles";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('users')
@Controller('users')
export class UsersController{
    constructor(
        private readonly userDbService: UsersDbService     
    ){}

    @ApiBearerAuth()
    @Get()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @UseInterceptors(DeletePasswordInterceptor)
    getDbUsers(@Query('page') page:string, @Query('limit') limit:string, @Req() request){
        !page ? page = '1' : page;
        !limit ? limit = '5' : limit;
        return this.userDbService.getDbUsers(Number(page), Number(limit));
    }

    @ApiBearerAuth()
    @Get(':id')
    @UseInterceptors(DeletePasswordInterceptor)
    @UseGuards(AuthGuard)
    getDbUserbyId(@Param('id', ParseUUIDPipe) id:string, @Req() request){
        return this.userDbService.getDbUserbyId(id);
    }
    
    @ApiBearerAuth()
    @Put(':id')
    @UseGuards(AuthGuard)
    updateDbUser(@Param('id',ParseUUIDPipe) id:string, @Body() user:Partial<CreateUserDto>){
        return this.userDbService.updateDbUser(id , user);
    }

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