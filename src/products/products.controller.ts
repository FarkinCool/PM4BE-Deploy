import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import IProductsData from "src/interfaces/IProducts";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { ProductsDbService } from "./products-db.service";
import { Products as ProductEntity } from "./products.entity";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/users/user.roles";
import { CreateProductDto } from "./products.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('products')
@Controller('products')
export class ProductsController{
    constructor( private readonly productDbService: ProductsDbService
    ){}
    
    @Get()
    getDbProducts(@Query('page') page: string, @Query('limit') limit:string){
        !page ? page = '1' : page;
        !limit ? limit = '5' : limit;
        return this.productDbService.getDbProducts(Number(page), Number(limit));
    }

    @Get('seeder')
    resetProducts(){
        return this.productDbService.resetProducts();
    }

    @Get(':id')
    getDbProductById(@Param('id', ParseUUIDPipe) id: string){
        return this.productDbService.getDbProductById(id);
    }

    @ApiBearerAuth()
    @Post()
    @UseGuards(AuthGuard)
    createDbProduct(@Body() product: CreateProductDto){
        return this.productDbService.createDbProduct(product);
    }

    @ApiBearerAuth()
    @Put(':id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    updateDbProduct(@Param('id', ParseUUIDPipe)id:string, @Body()product:Partial<CreateProductDto>  ){
        return this.productDbService.updateDbProduct(id,product);
    }

    @ApiBearerAuth()
    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteDbProduct(@Param('id', ParseUUIDPipe) id:string){
        return this.productDbService.deleteDbProduct(id);
    }































    // @Get()
    // getProducts(@Query('page') page:string, @Query('limit') limit:string ){
    //     !page ? page = '1' : page;
    //     !limit ? limit = '5' : limit;
    //     return this.productService.getProducts(Number(page), Number(limit));
    // }

    // @Get(':id')
    // getProductsById(@Param('id') id:string ){
    //     return this.productService.getProductsById(Number(id));
    // }

    // @Post()
    // @UseGuards(AuthGuard)
    // createProduct(@Body() product: IProductsData){
    //     return this.productService.createProduct(product);
    // }

    // @Put(':id')
    // @UseGuards(AuthGuard)
    // updateProduct(@Param('id') id:string, @Body()product: IProductsData ){
    //     return this.productService.updateProduct(Number(id),product);
    // }

    // @Delete(':id')
    // @UseGuards(AuthGuard)
    //     deleteProduct(@Param('id') id:string){
    //         return this.productService.deleteProduct(Number(id));
    // }

}