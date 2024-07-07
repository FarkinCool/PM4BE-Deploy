"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersDbService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("./users.entity");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
let UsersDbService = class UsersDbService {
    constructor(usersDbRepository) {
        this.usersDbRepository = usersDbRepository;
    }
    async createDbUser(user) {
        const newUser = await this.usersDbRepository.save(user);
        return newUser;
    }
    async getDbUsers(page, limit) {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const userlist = (await this.usersDbRepository.find()).slice(startIndex, endIndex);
        if (userlist.length !== 0) {
            return userlist;
        }
        else
            throw new common_1.NotFoundException("There are not users");
    }
    async getDbUserbyId(id) {
        const userfound = await this.usersDbRepository.findOne({ where: { id },
            relations: { orders: true }
        });
        if (!userfound)
            throw new common_1.NotFoundException("User not found with ID: ", id);
        return userfound;
    }
    async updateDbUser(id, user) {
        await this.usersDbRepository.update(id, user);
        return id;
    }
    async deleteDbUser(id) {
        const foundUser = await this.getDbUserbyId(id);
        if (!foundUser)
            throw new common_1.NotFoundException("User no register");
        if (foundUser.status === false)
            throw new common_1.BadRequestException("User was eliminated");
        await this.usersDbRepository.update(id, { status: false });
        return id;
    }
    async getUserDbByEmail(email) {
        return await this.usersDbRepository.findOne({ where: { email } });
    }
};
exports.UsersDbService = UsersDbService;
exports.UsersDbService = UsersDbService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersDbService);
//# sourceMappingURL=users-db.service.js.map