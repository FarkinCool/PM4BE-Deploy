/// <reference types="multer" />
import { FileUploadRepository } from './file-upload.repository';
import { ProductsDbService } from 'src/products/products-db.service';
export declare class FileUploadService {
    private readonly fileUploadRepository;
    private readonly productsDbService;
    constructor(fileUploadRepository: FileUploadRepository, productsDbService: ProductsDbService);
    uploadImage(file: Express.Multer.File, productId: string): Promise<import("../products/products.entity").Products>;
}
