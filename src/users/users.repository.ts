import { Injectable } from "@nestjs/common";
import IUsersData from "src/interfaces/IUsers";

let allUsers: IUsersData[] = [
  {
      id: 1,
      email: "john.doe@example.com",
      name: "John Doe",
      password: "securepassword123",
      address: "123 Main St",
      phone: "+1234567890",
      country: "USA",
      city: "New York"
    },
    {
      id: 2,
      email: "jane.smith@example.com",
      name: "Jane Smith",
      password: "anothersecurepassword",
      address: "456 Elm St",
      phone: "+0987654321",
      country: "USA",
      city: "Los Angeles"
    },
    {
      id: 3,
      email: "alice.jones@example.com",
      name: "Alice Jones",
      password: "password1234",
      address: "789 Oak St",
      phone: "+1122334455",
      country: "Canada",
      city: "Toronto"
    },
    {
      id: 4,
      email: "bob.brown@example.com",
      name: "Bob Brown",
      password: "mypassword5678",
      address: "101 Maple St",
      phone: "+2233445566",
      country: "UK",
      city: "London"
    },
    {
      id: 5,
      email: "carol.white@example.com",
      name: "Carol White",
      password: "securepass7890",
      address: "202 Pine St",
      phone: "+3344556677",
      country: "Australia",
      city: "Sydney"
    },

]; 

@Injectable()
export class UsersRepository {
 
    async getUsers(page:number,limit:number): Promise< IUsersData[] | string>{
      const startIndex = (page-1)*limit;
      const endIndex = startIndex+limit;
      const userlist = allUsers.slice(startIndex,endIndex);
      if(userlist.length !== 0){
        return await userlist;     /// passwor ojo 
      }
        else return "There are not users";
    }

    async getUserById(id: number): Promise<IUsersData>  {
      return await allUsers.find(ele => ele.id===id);    ///password ojo
    }

    async createUser(user: IUsersData): Promise<number>{
      const newId = await allUsers.length + 1;
      user.id = newId;
      await allUsers.push(user);
      return user.id;
    }

    async updateUser(id:number, user: IUsersData): Promise<number>{
      let findUser = await allUsers.findIndex(ele => ele.id === id);
      if(findUser === -1){
        throw new Error("user no found");
      }
      allUsers[findUser] = {...allUsers[findUser], ...user};
      return allUsers[findUser].id;
    }

    async deleteUser(id:number): Promise<number>{
      let findUser = await allUsers.findIndex(ele => ele.id === id);
      if(findUser === -1){
        throw new Error("user no found");
      }
      const userDelete = await allUsers.splice(findUser,1)[0];
      return userDelete.id;
    }

      ///// para login***///
      async getUserByEmail(email: string): Promise<IUsersData>{
        return await allUsers.find(ele => ele.email === email);
      }
}   