import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Orders } from "src/orders/orders.entity";



@Injectable()
export class UsersDbService{
    constructor (
        @InjectRepository(User) private readonly usersDbRepository:Repository<User>,
        //@InjectRepository(Orders) private readonly ordersDbOrders: Repository<Orders>
    ){}

    async createDbUser(user: Omit <User , 'id' | 'orders' >): Promise<User>{
        const newUser = await this.usersDbRepository.save(user);
        return newUser;
    }

    async getDbUsers(page: number, limit:number):Promise<User[]>{
        const startIndex = (page-1)*limit;
        const endIndex = startIndex+limit;
        const userlist = (await this.usersDbRepository.find()).slice(startIndex,endIndex);
        
        if(userlist.length !== 0){
            return userlist;     
          }
            else throw new NotFoundException( "There are not users");
    }

    async getDbUserbyId(id:string) :Promise<User>{
        const userfound = await this.usersDbRepository.findOne(
            {where: {id},
            relations:{orders:true}
        });

        if(!userfound) throw new NotFoundException("User not found with ID: ", id);
        return userfound;
    }

    async updateDbUser(id: string, user: Partial<User>): Promise<string>{
        await this.usersDbRepository.update(id,user);
        return id;
    }

    async deleteDbUser(id:string): Promise<string>{
        const foundUser = await this.getDbUserbyId(id);
        
        if(!foundUser) throw new NotFoundException("User no register");
        if(foundUser.status === false) throw new BadRequestException("User was eliminated");

        await this.usersDbRepository.update(id,{status:false});
        return id;
    }

    async getUserDbByEmail(email:string) :Promise<User>{
        return await this.usersDbRepository.findOne({where:{email}});
    }
}