import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersDbService } from "src/users/users-db.service";
import { User } from "src/users/users.entity";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService{
   
    constructor(
        private readonly usersDbRepository: UsersDbService,
        private readonly jwtService: JwtService,        
     ){}
     getAuth(): string{
        return 'el auth para los users';
    }

    async signUp(user: Omit <User , 'id' | 'orders' > ) {
        const {  email, password } = user;
        
        const founduser = await this.usersDbRepository.getUserDbByEmail(email);
        if(founduser) throw new BadRequestException('User is already exist');

        const hashpassword = await bcrypt.hash(password, 10);
        if(!hashpassword) throw new BadRequestException("error in hashing password");

        const newUser = await this.usersDbRepository.createDbUser({
            ...user,
            password: hashpassword,  
        })

        return newUser;
    }

    async signIn(email: string, password: string){
        if(!email || !password){
            throw new BadRequestException ("email y password are emptys");
        }
        const user =  await this.usersDbRepository.getUserDbByEmail(email);
        if(!user ) throw new BadRequestException("cretendials are incorrect");

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) throw new BadRequestException("cretendials are incorrect");

        const userPayload = {
            id:user.id,
            email: user.email,
            isAdmin: user.isAdmin
        };
        console.log(userPayload);

        const token = this.jwtService.sign(userPayload);

        return {message: 'User logued', token};
    }

}