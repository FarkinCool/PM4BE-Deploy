import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Products } from "./products.entity";
import { Repository } from "typeorm";
import { dataProducts } from "src/utils/archivo";
import { CategoriesService } from "src/categories/categories.service";
import { ProductsRepository } from "./products.repository";

@Injectable()
export class ProductsDbService{
    constructor(
        @InjectRepository(Products) private readonly productsDbRepository:Repository<Products>,
        private readonly productsRepository:ProductsRepository 
    ){}
    async createDbProduct(product:Partial <Products>): Promise<string>{
        const newProduct = await this.productsDbRepository.save(product);
        return newProduct.id;
    }

    async getDbProducts(page:number, limit: number): Promise<Products[] >{
        const startIndex = (page-1)*limit;
        const endIndex = startIndex+limit;
        const productlist = (await this.productsDbRepository.find(
            {
                relations:{ category:true,}
            }
        )).slice(startIndex,endIndex);
        
        if(productlist.length !== 0){
            return productlist;     
          }
            else throw new NotFoundException("There are not products");
    }

    async getDbProductById(id: string): Promise<Products>{
        return await this.productsDbRepository.findOne({where: {id}});
    }

    async updateDbProduct(id: string, product: Partial<Products>):Promise<string>{
        await this.productsDbRepository.update(id, product);
        return id;
    }

    async deleteDbProduct(id:string): Promise<string>{
        const foundProduct = await this.productsDbRepository.findOneBy({id});
        if(!foundProduct) throw new NotFoundException("this product is not available");
        if(foundProduct.status === false) throw new NotFoundException("this product is not available");
        foundProduct.status = false;
        await this.productsDbRepository.save(foundProduct);
        return id;
    }

    async addProducts(){
        return this.productsRepository.addProducts();
    }

    async resetProducts(){
        return this.productsRepository.resetProductsSeed();
    }

    

}