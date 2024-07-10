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
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('products')
@Controller('products')
export class ProductsController{
    constructor( private readonly productDbService: ProductsDbService
    ){}
    
    @ApiOperation({summary: 'List all products'})
    @ApiQuery({ name: 'page', required: true, description: 'Page number', example: '1' })
    @ApiQuery({ name: 'limit', required: true, description: 'Number of items per page', example: '5' })
    @ApiResponse({ status: 206, description: 'List of Products as requested :)'})
    @ApiResponse({ status: 404, description: 'There are not products :('})
    @Get()
    getDbProducts(@Query('page') page: string, @Query('limit') limit:string){
        !page ? page = '1' : page;
        !limit ? limit = '5' : limit;
        return this.productDbService.getDbProducts(Number(page), Number(limit));
    }

    @ApiOperation({summary: 'Reset of list of products'})
    @ApiResponse({ status: 200, description: 'List of Products were reset :)'})
    @ApiResponse({ status: 404, description: 'Fail to reset of products seeder :('})
    @Get('seeder')
    resetProducts(){
        return this.productDbService.resetProducts();
    }

    @ApiOperation({summary: 'list only one product by ID'})
    @ApiParam({ name: 'id', required: true, description: 'ID product', example: '1121qwewasd-qw54wqeqwe-45121' })
    @ApiResponse({ status: 200, description: 'Product found successfuly :)'})
    @ApiResponse({ status: 404, description: 'Product not found :('})
    @Get(':id')
    getDbProductById(@Param('id', ParseUUIDPipe) id: string){
        return this.productDbService.getDbProductById(id);
    }

    @ApiOperation({summary: 'Created a new product'})
    @ApiBody({type: CreateProductDto,
        examples: {
            example:{
                summary:"Example of registering a new product",
                value:{
                    "name": 'Produc testMonitor',
                    "description": 'product more efficient in the world',
                    "price": 180.99,
                    "stock": 12,
                    "categoryId": '40899326-b545-430c-a92f-a6e3fbdb1b0e',
                    "imgUrl":
                      'https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg'
                }
            }
        }
    })
    @ApiResponse({ status: 200, description: 'product created successfully :)'})
    @ApiResponse({ status: 400, description: 'The format used is incorrect :('})
    @ApiResponse({ status: 404, description: 'product not created :('})
    @ApiBearerAuth()
    @Post()
    @UseGuards(AuthGuard)
    createDbProduct(@Body() product: CreateProductDto){
        return this.productDbService.createDbProduct(product);
    }

    @ApiOperation({summary: 'Edit data of product by Id'})
    @ApiParam({ name: 'id', required: true, description: 'ID product', example: '1121qwewasd-qw54wqeqwe-45121' })
    @ApiBody({type: CreateProductDto,
        examples: {
            example:{
                summary:"Example of registering a new product",
                value:{
                    "name": 'Produc testMonitor',
                    "description": 'product more efficient in the world',
                    "price": 180.99,
                    "stock": 12,
                    "category": 'monitor',
                    "imgUrl":
                      'https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg',
                }
            }
        }
    })
    @ApiResponse({ status: 200, description: 'Product updated successfully :)'})
    @ApiResponse({ status: 400, description: 'The format used is incorrect :('})
    @ApiResponse({ status: 404, description: 'product not was updated :('})
    @ApiBearerAuth()
    @Put(':id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    updateDbProduct(@Param('id', ParseUUIDPipe)id:string, @Body()product:Partial<CreateProductDto>  ){
        return this.productDbService.updateDbProduct(id,product);
    }

    
    @ApiOperation({summary: 'Delete of one product by Id'})
    @ApiParam({ name: 'id', required: true, description: 'ID product', example: '1121qwewasd-qw54wqeqwe-45121' })
    @ApiResponse({ status: 200, description: 'Product deleted successfully :)'})
    @ApiResponse({ status: 404, description: 'Product not was eliminated  :('})
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