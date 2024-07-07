import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import IUsersData from "src/interfaces/IUsers";

@Injectable()
export class UsersService{
    constructor(
        private readonly usersRepository:UsersRepository,
    ){}
    getUsers(page:number, limit:number) {
        return this.usersRepository.getUsers(page,limit);
    }

    getUserById(id:number){
        return this.usersRepository.getUserById(id);
    }

    createUser(user:IUsersData){
        return this.usersRepository.createUser(user);
    }

    updateUser(id: number, user:IUsersData){
        return this.usersRepository.updateUser(id,user);
    }

    deleteUser(id:number){
        return this.usersRepository.deleteUser(id);
    }

  
}