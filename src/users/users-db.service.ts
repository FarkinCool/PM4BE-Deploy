import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Orders } from "src/orders/orders.entity";
import { UpdateUserDto } from "./users.updateDto";
import * as bcrypt from 'bcrypt';


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
        console.log("hola", userfound);
        if(!userfound) throw new NotFoundException("User not found with ID: ", id);
        return  userfound;
    }

    async updateDbUser(id: string, user: Partial<UpdateUserDto>): Promise<string>{
        const foundUser = await this.getDbUserbyId(id);
        if(!foundUser) throw new NotFoundException("User not found");
        const {password, confirmpassword} = user;
        if((password && !confirmpassword) || !password && confirmpassword)
            throw new BadRequestException("both passwords should be present");

        if(password && confirmpassword){
            const hashpassword = await bcrypt.hash(password, 10);
            if(!hashpassword) throw new BadRequestException("error in hashing password");
            delete user.confirmpassword;
            await this.usersDbRepository.update(id,
                {...user,
                password: hashpassword,}
            );  
        }
        else{
            await this.usersDbRepository.update(id,user);
        }
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