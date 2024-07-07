import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { dataProducts } from "src/utils/archivo";
import { Categories } from "./categories.entity";
import { Repository } from "typeorm";



@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Categories) private readonly categoriesDbRepository: Repository<Categories>
    ){}

    async createDbCategorie(categorie: Partial<Categories>){
        const {name} = categorie;
        const foundCategorie = await this.categoriesDbRepository.findOneBy({name});
        console.log(foundCategorie);
        if(foundCategorie) throw new BadRequestException("Category already exists");
        return this.categoriesDbRepository.save(categorie);
    }

    async getCategories(){
        return await this.categoriesDbRepository.find();
        // console.log("categories con find", categories); 
        // return categories;
    }

    async addCategories(){
        const categoriesName = await new Set(dataProducts.map(cat => cat.category));
        const listCategories = Array.from(categoriesName);
        if(listCategories.length ===0 ) throw new NotFoundException("There not registers in categories Data");
        for(const name of listCategories){
            const foundCategories = await this.categoriesDbRepository.findOne({where:{name}})

            if (!foundCategories) {
                const savePromises = listCategories.map(async (ele) =>{
                    const category = new Categories();
                    category.name = ele;
                    console.log('Saving category:', category);
                    await this.categoriesDbRepository.save(category);
                });
                await Promise.all(savePromises);                
            }
            else
                {
                    console.log("categories already exists, skipping...");
                }
        }
        return "Categories reload";
    }

    async resetCategories(){
        const categoriesName = await new Set(dataProducts.map(cat => cat.category));
        const skipCategories = new Set();
        for(const datacategory of dataProducts){
            const foundCategory = await this.categoriesDbRepository.findOne({where: {name: datacategory.category}});
            if(foundCategory){
                skipCategories.add(foundCategory);
            }
        }
        const resetCategories = dataProducts.filter((ele) => !skipCategories.has(ele.category));

        for(const ele of resetCategories){
            const categorieToUpdate = await this.categoriesDbRepository.findOne({where:{name:ele.category}});
            if(categorieToUpdate){
                categorieToUpdate.name = ele.category;
                categorieToUpdate.status = true;
                await this.categoriesDbRepository.save(categorieToUpdate);
            }
            else{
                const newCategorie = new Categories();
                newCategorie.name = ele.category;
                categorieToUpdate.status = true;
                await this.categoriesDbRepository.save(newCategorie);
            }
            
        }
        return "Categories were updating....";
    }

    async deleteCategory(id : string){
        const foundCategorie = await this.categoriesDbRepository.findOneBy({id});
        if(!foundCategorie) throw new NotFoundException("this category not found");
        if(foundCategorie.status === false) throw new ConflictException("category is not available");
        await this.categoriesDbRepository.update(id,{status:false});
        return id; 
    }
}