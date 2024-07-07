"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const common_1 = require("@nestjs/common");
let allUsers = [
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
let UsersRepository = class UsersRepository {
    async getUsers(page, limit) {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const userlist = allUsers.slice(startIndex, endIndex);
        if (userlist.length !== 0) {
            return await userlist;
        }
        else
            return "There are not users";
    }
    async getUserById(id) {
        return await allUsers.find(ele => ele.id === id);
    }
    async createUser(user) {
        const newId = await allUsers.length + 1;
        user.id = newId;
        await allUsers.push(user);
        return user.id;
    }
    async updateUser(id, user) {
        let findUser = await allUsers.findIndex(ele => ele.id === id);
        if (findUser === -1) {
            throw new Error("user no found");
        }
        allUsers[findUser] = { ...allUsers[findUser], ...user };
        return allUsers[findUser].id;
    }
    async deleteUser(id) {
        let findUser = await allUsers.findIndex(ele => ele.id === id);
        if (findUser === -1) {
            throw new Error("user no found");
        }
        const userDelete = await allUsers.splice(findUser, 1)[0];
        return userDelete.id;
    }
    async getUserByEmail(email) {
        return await allUsers.find(ele => ele.email === email);
    }
};
exports.UsersRepository = UsersRepository;
exports.UsersRepository = UsersRepository = __decorate([
    (0, common_1.Injectable)()
], UsersRepository);
//# sourceMappingURL=users.repository.js.map