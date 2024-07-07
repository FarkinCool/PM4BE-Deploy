import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import IProductsData from "src/interfaces/IProducts";
import { Products } from "./products.entity";
import { Repository } from "typeorm";
import { Categories } from "src/categories/categories.entity";
import { dataProducts } from "src/utils/archivo";
import { writeHeapSnapshot } from "v8";
import { Orders } from "src/orders/orders.entity";



Injectable()
export class ProductsRepository{
  constructor(
    @InjectRepository(Products) private productsRepository: Repository <Products>,
    @InjectRepository(Categories) private categoriesRepository: Repository<Categories>,
    @InjectRepository(Orders) private ordersRepository: Repository<Orders> 
  ){}
  async addProducts(){
    const categories = await this.categoriesRepository.find();
    dataProducts?.map(async (ele) =>{
      const category = categories.find(
        (category) => category.name === ele.category
      );
      const product = new Products();
      product.name = ele.name;
      product.description = ele.description;
      product.price = ele.price;
      product.imgUrl = ele.imgUrl;
      product.stock = ele.stock;
      product.category = category;

      await this.productsRepository
        .createQueryBuilder()
        .insert()
        .into(Products)
        .values(product)
        .orUpdate(
          ['description','price', 'imgUrl', 'stock'],['name']
        )
        .execute();

    });
    return 'Products reload';
  }  

  async resetProductsSeed(){
    const categories = await this.categoriesRepository.find();
    const skipProducts = new Set(); 

    for(const dataproduct of dataProducts){
      const foundProduct = await this.productsRepository.findOne({where: {name: dataproduct.name}});
      if(foundProduct){
        const foundOrder = await this.ordersRepository.findOne({
          where: { orderDetails :{ products : { id:foundProduct.id }}}
        });

        if(foundOrder){
          skipProducts.add(foundProduct.name);
          continue;
        }
      }
    }
    console.log(skipProducts);
    const resetProducts =  dataProducts.filter((ele)=> !skipProducts.has( ele.name)  );
    
    for(const ele of resetProducts){
      const category = categories.find(
        (category) => category.name === ele.category);
      const productToUpdate = await this.productsRepository.findOne({where: {name: ele.name}});

      if(productToUpdate){
        productToUpdate.name = ele.name;
        productToUpdate.description = ele.description;
        productToUpdate.price = ele.price;
        productToUpdate.imgUrl = ele.imgUrl;
        productToUpdate.stock = ele.stock;
        productToUpdate.category = category;
        productToUpdate.status = true;
        await this.productsRepository.save(productToUpdate);
      }
      else{
        const newproduct = new Products();
        newproduct.name = ele.name;
        newproduct.description = ele.description;
        newproduct.price = ele.price;
        newproduct.imgUrl = ele.imgUrl;
        newproduct.stock = ele.stock;
        newproduct.category = category;
        await this.productsRepository.save(newproduct);
      }

    }

    return 'Products whitout orders were reset';

  }


}













// let allProducts: IProductsData[] = [
//   {
//       id: 1,
//       name: "Laptop",
//       description: "A high performance laptop",
//       price: 1500.00,
//       stock: true,
//       imgUrl: "https://example.com/laptop.jpg"
//     },
//     {
//       id: 2,
//       name: "Smartphone",
//       description: "A latest model smartphone",
//       price: 999.99,
//       stock: true,
//       imgUrl: "https://example.com/smartphone.jpg"
//     },
//     {
//       id: 3,
//       name: "Headphones",
//       description: "Noise-cancelling headphones",
//       price: 199.99,
//       stock: true,
//       imgUrl: "https://example.com/headphones.jpg"
//     },
//     {
//       id: 4,
//       name: "Smartwatch",
//       description: "A smartwatch with various features",
//       price: 299.99,
//       stock: false,
//       imgUrl: "https://example.com/smartwatch.jpg"
//     },
//     {
//       id: 5,
//       name: "Tablet",
//       description: "A tablet with a large screen",
//       price: 499.99,
//       stock: true,
//       imgUrl: "https://example.com/tablet.jpg"
//     },        
// ];

// Injectable()
// export class ProductsRepository{
   
//     async getProducts(page :number, limit:number) :Promise<IProductsData[] | string>{
//       const startIndex = (page-1)*limit;
//       const endIndex = startIndex+limit;
//       const productlist = allProducts.slice(startIndex,endIndex);
//         if(productlist.length !== 0){
//           return await productlist;
//         }
//         else return "there are no products";
//     }

//     async getProductsById(id: number): Promise<IProductsData>{
//       return await allProducts.find(ele=> ele.id === id);
//     }

//     async createProduct(product : IProductsData): Promise<number>{
//       const newId = await allProducts.length + 1;
//       product.id = newId;
//       await allProducts.push(product);
//       return product.id;
//     }

//     async updateProduct(id: number, product:IProductsData): Promise<number>{
//       const findProduct = await allProducts.findIndex(ele => ele.id ===id);
//       if(findProduct===-1){
//          throw new Error('product not found');
//       }
//       allProducts[findProduct] = {...allProducts[findProduct], ...product };
//       return allProducts[findProduct].id;
//     }

//     async deleteProduct(id:number): Promise<number>{
//       const findProduct = await allProducts.findIndex(ele => ele.id ===id);
//       if(findProduct===-1){
//          throw new Error('product not found');
//       }
//       const deleteProduct = await allProducts.splice(findProduct,1)[0];
//       return deleteProduct.id;
//     }

 

// }


