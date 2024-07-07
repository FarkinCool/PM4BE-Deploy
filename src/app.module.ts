import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './config/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { JwtModule } from '@nestjs/jwt';
import { SeederModule } from './seeds/seeder.module';
import { SeederService } from './seeds/seeder.service';
import { CategoriesService } from './categories/categories.service';
import { ProductsDbService } from './products/products-db.service';
import { ProductsRepository } from './products/products.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('typeorm'),                     //pra pasar cosas asincronas
  }),
  ProductsModule,UsersModule,AuthModule,CategoriesModule, OrdersModule, FileUploadModule, SeederModule,
    JwtModule.register({
        global: true,
        secret: process.env.JWT_SECRET,
        signOptions: {expiresIn: '60m'},
    })],
  controllers: [AppController],
  providers: [AppService, SeederService,CategoriesService,ProductsDbService,ProductsRepository],
})
export class AppModule implements OnModuleInit {
  constructor(
      private readonly seedService: SeederService
  ){}
  async onModuleInit() {
    await this.seedService.seedData();
  }
}
