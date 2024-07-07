import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CreateCategorieDto } from "./categorie.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/auth/guards/auth.guard";

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
    constructor(
        private readonly categories: CategoriesService
    ){}

    @Get('seeder')
    resetCategories(){
        return this.categories.resetCategories();
    }
    @Get()
    getCategories(){
        return this.categories.getCategories();
    }

    @ApiBearerAuth()
    @Post()
    @UseGuards(AuthGuard)
    createDbCategorie(@Body() categorie: Partial<CreateCategorieDto>){
        return this.categories.createDbCategorie(categorie);
    }

    @ApiBearerAuth()
    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteCategory(@Param('id', ParseUUIDPipe) id: string ){
        return this.categories.deleteCategory(id);
    }

}
