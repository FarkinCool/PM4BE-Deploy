import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { Products } from "src/products/products.entity";
import { CreateOrderDto } from "./orders.dto";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('orders')
@Controller('orders')
export class OrdersController{
    constructor(
        private readonly ordersService: OrdersService
    ){}

    @ApiBearerAuth()
    @Get(':id')
    @UseGuards(AuthGuard)
    getOrder(@Param('id', ParseUUIDPipe) id:string ){
        return this.ordersService.getOrder(id);
    }

    @ApiBearerAuth()
    @Post()
    @UseGuards(AuthGuard)
    addOrder(@Body() order: CreateOrderDto){
        const {userId, products} = order;
        return this.ordersService.addOrder(userId,products);
    }

}