import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/users.entity";
import { Repository } from "typeorm";
import { Orders } from "./orders.entity";
import { Products, Products as ProductsEntity } from "src/products/products.entity";
import { OrderDetails } from "src/orderDetails/orderDetails.entity";

@Injectable()
export class OrdersRepository{
    constructor(
        @InjectRepository(User) private readonly userDbRepository: Repository<User>,
        @InjectRepository(Orders) private readonly ordersDbRepository: Repository<Orders>,
        @InjectRepository(Products) private readonly productsDbRepository: Repository<Products>,
        @InjectRepository(OrderDetails) private readonly ordersDbDetail: Repository<OrderDetails>
    ){}

    async addOrder(userId: string, products: ProductsEntity[]){
        let total = 0;
        const findUserId = await this.userDbRepository.findOneBy({id: userId});  
        if(!findUserId || findUserId.status === false) throw new NotFoundException("User can not buy products ", userId );
        
        const nOrder =  new Orders();
        nOrder.date = (new Date()).toDateString();
        nOrder.user = findUserId;

        const newOrder = await this.ordersDbRepository.save(nOrder);

        const productsArray = await Promise.all(
            products?.map(async(prod) => {
                const findProduct = await this.productsDbRepository.findOneBy(
                    {id : prod.id},
                );
                if(!findProduct) throw new NotFoundException("product not found with id: ", prod.id);
                if(findProduct.stock <= 0 || findProduct.status === false) throw new BadRequestException("product whitout stock, choose another one");
                total = total + Number(findProduct.price);

                // if(+findProduct.stock && +findProduct.stock >=1){
                    await this.productsDbRepository.update(
                        {id: prod.id},
                        {stock: findProduct.stock-1},
                    );
                // }else  return null;

                return prod;
            }),
        );//ojo stock 0
        let validProducts = productsArray.filter((prod) => prod !== null);

        const buyDetail = new OrderDetails();
        buyDetail.price = Number(Number(total).toFixed(2));
        console.log("este es el price " + buyDetail.price);
        buyDetail.products = validProducts;
        buyDetail.orders = newOrder;

        await this.ordersDbDetail.save(buyDetail);

        return await this.ordersDbRepository.find(
                {where: {id:newOrder.id}, relations: {orderDetails: true} }
            )
    }

    async getOrder(id:string){
      const foundOrder = await this.ordersDbRepository.findOne(
        {where: {id},
        relations: {
            orderDetails:{
                products: true,
                } 
            }
        }
        );
        
        if(!foundOrder) throw new NotFoundException("order not found with id: ", id);
        return foundOrder;
    }

   
}