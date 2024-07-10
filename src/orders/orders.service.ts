import { Injectable } from "@nestjs/common";
import { OrdersRepository } from "./orders.repository";
import { Products } from "src/products/products.entity";
import { UsersDbService } from "src/users/users-db.service";


@Injectable()
export class OrdersService{
    constructor(
        private readonly ordersRepository: OrdersRepository
    ){} 

    addOrder(userId: string, products: Omit <Products[], 'id' >){
    return this.ordersRepository.addOrder(userId, products);
    } 

    getOrder(id:string){
        return this.ordersRepository.getOrder(id);
    }

    deleteOrder(id:string){
        return this.ordersRepository.deleteOrder(id);
    }
}