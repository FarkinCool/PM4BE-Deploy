import { ApiHideProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsEmpty, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { Products } from "src/products/products.entity";

export class CreateOrderDto{

    /**
     * Debe ser un string del tipo uuid; que pertenezca a un usuario
     * @example "asd4d58q4d-4qw45-qwe4546-qwewq4541"
     */
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    userId: string;

    /**
     * Debe ser un arreglo del tipo products, se ingresaras los IDs de los productos
     */
    @IsArray()
    @ArrayMinSize(1)
    products: Partial<Products[]>;

    @ApiHideProperty()
    @IsEmpty()
    status: boolean;

}