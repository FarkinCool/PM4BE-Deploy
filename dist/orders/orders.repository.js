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
exports.OrdersRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("../users/users.entity");
const typeorm_2 = require("typeorm");
const orders_entity_1 = require("./orders.entity");
const products_entity_1 = require("../products/products.entity");
const orderDetails_entity_1 = require("../orderDetails/orderDetails.entity");
const validUuid_utils_1 = require("../utils/validUuid.utils");
let OrdersRepository = class OrdersRepository {
    constructor(userDbRepository, ordersDbRepository, productsDbRepository, ordersDbDetail) {
        this.userDbRepository = userDbRepository;
        this.ordersDbRepository = ordersDbRepository;
        this.productsDbRepository = productsDbRepository;
        this.ordersDbDetail = ordersDbDetail;
    }
    async addOrder(userId, products) {
        let total = 0;
        const findUserId = await this.userDbRepository.findOneBy({ id: userId });
        console.log("userID", findUserId);
        if (!findUserId || findUserId.status === false)
            throw new common_1.NotFoundException("User can not buy products ", userId);
        products.forEach(prod => {
            if (!(0, validUuid_utils_1.isValidUUIDv4)(prod.id)) {
                throw new common_1.BadRequestException("Invalid UUID format for product: " + prod.id);
            }
        });
        const nOrder = new orders_entity_1.Orders();
        nOrder.date = (new Date()).toDateString();
        nOrder.user = findUserId;
        const newOrder = await this.ordersDbRepository.save(nOrder);
        const productsArray = await Promise.all(products?.map(async (prod) => {
            const findProduct = await this.productsDbRepository.findOneBy({ id: prod.id });
            console.log("para comprar: ", findProduct);
            if (!findProduct)
                throw new common_1.NotFoundException("product not found with id: ", prod.id);
            if (findProduct.stock <= 0 || findProduct.status === false) {
                console.log("product whitout stock, choose another one");
                return null;
            }
            console.log("el stock es:", findProduct.stock);
            total = total + Number(findProduct.price);
            await this.productsDbRepository.update({ id: prod.id }, { stock: findProduct.stock - 1 });
            return prod;
        }));
        let validProducts = productsArray.filter((prod) => prod !== null);
        const buyDetail = new orderDetails_entity_1.OrderDetails();
        buyDetail.price = Number(Number(total).toFixed(2));
        console.log("este es el price " + buyDetail.price);
        buyDetail.products = validProducts;
        buyDetail.orders = newOrder;
        await this.ordersDbDetail.save(buyDetail);
        return await this.ordersDbRepository.find({ where: { id: newOrder.id }, relations: { orderDetails: true } });
    }
    async getOrder(id) {
        const foundOrder = await this.ordersDbRepository.findOne({ where: { id },
            relations: {
                orderDetails: {
                    products: true,
                }
            }
        });
        if (!foundOrder)
            throw new common_1.NotFoundException("order not found with id: ", id);
        return foundOrder;
    }
    async deleteOrder(orderId) {
        const foundOrder = await this.ordersDbRepository.findOneBy({ id: orderId });
        if (!foundOrder)
            throw new common_1.NotFoundException("Order does not exist");
        const foundUser = await this.userDbRepository.findOne({
            where: { id: orderId }, relations: ['orders']
        });
        if (!foundUser || foundUser.status === false) {
            if (foundOrder.status === false) {
                throw new common_1.BadRequestException("this order was eliminated");
            }
            else {
                await this.ordersDbRepository.update(orderId, { status: false });
            }
        }
        return orderId;
    }
};
exports.OrdersRepository = OrdersRepository;
exports.OrdersRepository = OrdersRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(orders_entity_1.Orders)),
    __param(2, (0, typeorm_1.InjectRepository)(products_entity_1.Products)),
    __param(3, (0, typeorm_1.InjectRepository)(orderDetails_entity_1.OrderDetails)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrdersRepository);
//# sourceMappingURL=orders.repository.js.map