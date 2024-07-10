import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileUploadDto } from './fileUpload.dto';

@ApiTags('files')
@Controller('files')
export class FileUploadController {
    constructor(
        private readonly fileUploadService: FileUploadService
    ){}

    @ApiOperation({summary: 'Add a imagen in a product'})
    @ApiParam({ name: 'id', required: true, description: 'ID product', example: '1121qwewasd-qw54wqeqwe-45121' })
    @ApiBearerAuth()
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: "Image of product: Files permitted are: jpg | png | jpeg | webp [with maxSize: 204800]",
        type: FileUploadDto,
        required: true,
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                    description: 'Image file',
                    example: 'file.jpg',
                },
            },
            examples: {
                example: {
                    summary: "Files permitted are: jpg|png|jpeg|webp",
                    value: {
                        file: "file.jpg"
                    }
                }
            }
        },
    })
    @ApiResponse({ status: 201, description: 'Product updated successfully :)'})
    @ApiResponse({ status: 400, description: 'The format used is incorrect :('})
    @ApiResponse({ status: 404, description: 'product not was updated :('})
    @Post('uploadImage/:id') 
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('file')) 
    uploadImage(@Param('id') productId: string, 
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({
                        maxSize: 204800,
                        message: 'Supera al maximo archivo permitido'
                    }),
                    new FileTypeValidator({
                        fileType: /(.jpg|.png|.jpeg|.webp)/,
                    })
                ]
            })
                
        ) file: Express.Multer.File,){
        return this.fileUploadService.uploadImage(file, productId);
        
    }

}
