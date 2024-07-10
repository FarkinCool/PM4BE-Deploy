import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { Products } from "src/products/products.entity";
import { CreateOrderDto } from "./orders.dto";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/users/user.roles";
import { RolesGuard } from "src/auth/guards/roles.guard";

@ApiTags('orders')
@Controller('orders')
export class OrdersController{
    constructor(
        private readonly ordersService: OrdersService
    ){}

    @ApiOperation({summary: 'list only one Order by ID'})
    @ApiParam({ name: 'id', required: true, description: 'ID Order', example: '1121qwewasd-qw54wqeqwe-45121' })
    @ApiResponse({ status: 200, description: 'Order found successfuly :)'})
    @ApiResponse({ status: 404, description: 'Order not found :('})
    @ApiBearerAuth()
    @Get(':id')
    @UseGuards(AuthGuard)
    getOrder(@Param('id', ParseUUIDPipe) id:string ){
        return this.ordersService.getOrder(id);
    }

    @ApiOperation({summary: 'Add a new Order'})
    @ApiBody({type: CreateOrderDto,
        examples: {
            example:{
                summary:"Example by a new order",
                value:{
                    "userId":"a1032837-05ac-4343-afd4-86dd8101e",
                    "products":
                    [
                      {
                       "id":"d43f30-6d02-4430-bea4-2a444c3476db"
                      },
                      {
                      "id":"100aa9cc-31d3-406a-a3e4-5ee3ec4446c2"
                      }
                    ]
                }
            }
        }
    })
    @ApiResponse({ status: 201, description: 'Order created successfully :)'})
    @ApiResponse({ status: 400, description: 'The format used is incorrect :('})
    @ApiResponse({ status: 404, description: 'Order not created :('})
    @ApiBearerAuth()
    @Post()
    @UseGuards(AuthGuard)
    addOrder(@Body() order: CreateOrderDto){
        const {userId, products} = order;
        return this.ordersService.addOrder(userId,products);
    }

    @ApiOperation({summary: 'Delete of one order by Id'})
    @ApiParam({ name: 'id', required: true, description: 'ID Order', example: '1121qwewasd-qw54wqeqwe-45121' })
    @ApiResponse({ status: 200, description: 'Order deleted sucessfuly :)'})
    @ApiResponse({ status: 403, description: 'You dont have privilegies for the request :)'})
    @ApiResponse({ status: 401, description: 'Not authorized :('})
    @ApiBearerAuth()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @Delete(':id')
    deleteOrder(@Param('id', ParseUUIDPipe) id :string){
        return this.ordersService.deleteOrder(id);
    }

}