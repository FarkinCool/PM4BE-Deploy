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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_db_service_1 = require("../users/users-db.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(usersDbRepository, jwtService) {
        this.usersDbRepository = usersDbRepository;
        this.jwtService = jwtService;
    }
    getAuth() {
        return 'el auth para los users';
    }
    async signUp(user) {
        const { email, password } = user;
        const founduser = await this.usersDbRepository.getUserDbByEmail(email);
        if (founduser)
            throw new common_1.BadRequestException('User is already exist');
        const hashpassword = await bcrypt.hash(password, 10);
        if (!hashpassword)
            throw new common_1.BadRequestException("error in hashing password");
        const newUser = await this.usersDbRepository.createDbUser({
            ...user,
            password: hashpassword,
        });
        return newUser;
    }
    async signIn(email, password) {
        if (!email || !password) {
            throw new common_1.BadRequestException("email y password are emptys");
        }
        const user = await this.usersDbRepository.getUserDbByEmail(email);
        if (!user)
            throw new common_1.BadRequestException("cretendials are incorrect");
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            throw new common_1.BadRequestException("cretendials are incorrect");
        const userPayload = {
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin
        };
        console.log(userPayload);
        const token = this.jwtService.sign(userPayload);
        return { message: 'User logued', token };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_db_service_1.UsersDbService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map