import { ApiHideProperty } from "@nestjs/swagger";
import { IsEmpty, IsString, MinLength } from "class-validator";

export class CreateCategorieDto{

    /**
    * Debe ser un string de 50 caracteres como maximo, minimo de 4; para el nombre de una categoria clase de un producto
    */
    @IsString()
    @MinLength(4)
    name: string;

    @ApiHideProperty()
    @IsEmpty()
    status: boolean;
}