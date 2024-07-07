import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { ProductsDbService } from 'src/products/products-db.service';

@Injectable()
export class FileUploadService {
    constructor(
        private readonly fileUploadRepository: FileUploadRepository,
        private readonly productsDbService: ProductsDbService
    ){}
    async uploadImage(file: Express.Multer.File, productId: string){
        const foundProduct = await this.productsDbService.getDbProductById(productId);
        if(!foundProduct) throw new NotFoundException('Product not found!');
        const response = await this.fileUploadRepository.uploadImage(file);
        if(!response.secure_url) throw new NotFoundException("Image no upload");

        try {
            const productUpdate = await this.productsDbService.updateDbProduct(productId,{imgUrl: response.secure_url});
            if(!productUpdate)
                throw new InternalServerErrorException('Failed to update product with image');

            const productwithImage = await this.productsDbService.getDbProductById(productUpdate);
            return productwithImage;

        } catch (error) {
            console.log('error update product: ', error);
            throw new InternalServerErrorException('An error occurred while updating image');
        }
    }
}
