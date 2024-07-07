import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileUploadDto } from './fileUpload.dto';

@ApiTags('files')
@Controller('files')
export class FileUploadController {
    constructor(
        private readonly fileUploadService: FileUploadService
    ){}

    @ApiBearerAuth()
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Image of product',
        type: FileUploadDto
      })
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
