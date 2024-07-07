import { Module } from '@nestjs/common';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { FileUploadRepository } from './file-upload.repository';
import { ProductsDbService } from 'src/products/products-db.service';
import { ProductsModule } from 'src/products/products.module';
import { ProductsRepository } from 'src/products/products.repository';

@Module({
  imports: [ProductsModule],
  controllers: [FileUploadController],
  providers: [FileUploadService, CloudinaryConfig, FileUploadRepository,ProductsDbService, ProductsRepository]
})
export class FileUploadModule {}
