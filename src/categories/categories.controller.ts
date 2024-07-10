import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CreateCategorieDto } from "./categorie.dto";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/auth/guards/auth.guard";

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
    constructor(
        private readonly categories: CategoriesService
    ){}

    @ApiOperation({summary: 'Reset seeder categories'})
    @ApiResponse({ status: 200, description: 'List of Categories were reset :)'})
    @ApiResponse({ status: 404, description: 'Fail to reset of Categories seeder :('})
    @Get('seeder')
    resetCategories(){
        return this.categories.resetCategories();
    }

    @ApiOperation({summary: 'List all Categories'})
    @ApiResponse({ status: 200, description: 'List of Categories :)'})
    @ApiResponse({ status: 404, description: 'There are not categories :('})
    @Get()
    getCategories(){
        return this.categories.getCategories();
    }

    @ApiOperation({summary: 'Create a new Categorie'})
    @ApiBody({type: CreateCategorieDto,
        examples: {
            example:{
                summary:"Example of registering a new product",
                value:{
                    "name": 'Electronic domestics'
                }
            }
        }
    })
    @ApiResponse({ status: 200, description: 'Category created successfully :)'})
    @ApiResponse({ status: 400, description: 'The format used is incorrect :('})
    @ApiResponse({ status: 404, description: 'category not created :('})
    @ApiBearerAuth()
    @Post()
    @UseGuards(AuthGuard)
    createDbCategorie(@Body() categorie: Partial<CreateCategorieDto>){
        return this.categories.createDbCategorie(categorie);
    }

    @ApiOperation({summary: 'Delete a Categorie'})
    @ApiParam({ name: 'id', required: true, description: 'ID Category', example: '1121qwewasd-qw54wqeqwe-45121' })
    @ApiResponse({ status: 200, description: 'Category deleted successfully :)'})
    @ApiResponse({ status: 404, description: 'Category not was eliminated  :('})
    @ApiBearerAuth()
    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteCategory(@Param('id', ParseUUIDPipe) id: string ){
        return this.categories.deleteCategory(id);
    }
}
