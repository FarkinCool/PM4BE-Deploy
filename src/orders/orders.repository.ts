import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/users.entity";
import { Repository } from "typeorm";
import { Orders } from "./orders.entity";
import { Products, Products as ProductsEntity } from "src/products/products.entity";
import { OrderDetails } from "src/orderDetails/orderDetails.entity";
import {isValidUUIDv4} from "../utils/validUuid.utils";

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
        console.log("userID", findUserId); 
        if(!findUserId || findUserId.status === false) throw new NotFoundException("User can not buy products ", userId );

        products.forEach(prod => {
            if (!isValidUUIDv4(prod.id)) {
                throw new BadRequestException("Invalid UUID format for product: " + prod.id);
            }
        });
        
        const nOrder =  new Orders();
        nOrder.date = (new Date()).toDateString();
        nOrder.user = findUserId;

        const newOrder = await this.ordersDbRepository.save(nOrder);

        const productsArray = await Promise.all(
            products?.map(async(prod) => {
                const findProduct = await this.productsDbRepository.findOneBy(
                    {id : prod.id});
                    console.log("para comprar: ", findProduct);
                    
                if(!findProduct) throw new NotFoundException("product not found with id: ", prod.id);
                if(findProduct.stock <= 0 || findProduct.status === false){
                        console.log("product whitout stock, choose another one");
                    return null;
                }
                    console.log("el stock es:", findProduct.stock);
                    
                total = total + Number(findProduct.price);
                await this.productsDbRepository.update(
                    {id: prod.id},
                    {stock: findProduct.stock-1},
                    );
                return prod;
            }),
        );
        let validProducts = productsArray.filter((prod) => prod !== null);

        const buyDetail = new OrderDetails();
        buyDetail.price = Number(Number(total).toFixed(2));
        console.log("este es el price " + buyDetail.price);
        buyDetail.products = validProducts;
        buyDetail.orders = newOrder;

        await this.ordersDbDetail.save(buyDetail);

        return await this.ordersDbRepository.find(
                {where: {id:newOrder.id}, relations: {orderDetails: true} }
            );
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

    async deleteOrder(orderId:string){
        const foundOrder = await this.ordersDbRepository.findOneBy({id:orderId});
        if(!foundOrder) throw new NotFoundException("Order does not exist");
        const foundUser = await this.userDbRepository.findOne({
            where: {id:orderId}, relations:['orders']            
        });

        if(!foundUser || foundUser.status === false){
            if(foundOrder.status === false){
                throw new BadRequestException("this order was eliminated");
            }
            else{
                await this.ordersDbRepository.update(orderId,{status:false});
            }

        }
        return orderId; 
    }
}