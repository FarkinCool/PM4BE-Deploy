import { ApiHideProperty } from "@nestjs/swagger";
import { IsBoolean, IsDecimal, IsEmpty, IsNotEmpty, IsNumber, IsString, MaxLength, isNumber } from "class-validator";


export class CreateProductDto{

    /**
     * Debe ingresar un string, de 50 caracteres como maximo, no nulo , para el nombre de un producto
     * @example 'Logitech G pro'
     */
    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    name: string;

    /**
     * Debe ingresar un string, no nulo; para la descripcion del producto
     * @example 'el mejor teclado'
     */
    @IsString()
    @IsNotEmpty()
    description: string;

    /**
    * Debe ingresar un numero decimal de 2 digitos, no nulo; para el precio del producto
    * @example 96.37
    */
    @IsNotEmpty()
    @IsNumber()
    @IsDecimal({decimal_digits:'2'})    
    price: number;

    /**
     * Debe ingresar un numero entero, no nulo; para el stock del producto
     * @example 12
     */
    @IsNotEmpty()
    @IsNumber()
    stock: number;

    /**
     * Debe ser un string no nulo; para la imagen(una URL de una imagen)
     */
    @IsNotEmpty()
    @IsString()
    imgUrl: string;

    @ApiHideProperty()
    @IsEmpty()
    status: boolean;
}