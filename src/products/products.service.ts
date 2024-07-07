import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import IProductsData from "src/interfaces/IProducts";


@Injectable()
export class ProductsService{
    constructor(
        private readonly productsRepository:ProductsRepository,
    ){}

    // getProducts(page:number, limit: number) {
    //     return this.productsRepository.getProducts(page, limit);
    // }

    // getProductsById(id:number){
    //     return this.productsRepository.getProductsById(id);
    // }

    // createProduct(product:IProductsData){
    //     return this.productsRepository.createProduct(product);
    // }

    // updateProduct(id: number, product:IProductsData){
    //     return this.productsRepository.updateProduct(id, product);
    // }
    
    // deleteProduct(id:number){
    //     return this.productsRepository.deleteProduct(id);
    // }

}