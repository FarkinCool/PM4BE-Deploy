import { ApiHideProperty } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString, IsStrongPassword, MaxLength, MinLength, Validate } from "class-validator";
import { MatchPassword } from "src/decorators/matchPassword.decorator";

export class CreateUserDto{

    /**
     * Debe ser un string de entre 3 y 50 caracteres
     * @example 'Juan Perez'
     */
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    name:string;

    /**
     * Debe ser un string con formato de email valido
     * @example 'jperez@mail.com'
     */
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    /**
     * Debe contener entre 8 y 15 caracteres, e incluir al menos una minuscula, una mayuscula, un numero y un simbolo
     * @example 'userPass123+'
     */
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(15)
    @IsStrongPassword({         
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1})
    password: string;
    
    /**
     * Debe ser iguales con el password
     * @example 'userPass123+'
     */
    @IsString()
    @IsNotEmpty()
    @Validate(MatchPassword, ['password'])
    confirmpassword: string;
    
    /** 
     *  Debe ser un string entre 3 y 50 caracteres
     *  @example 'street Elm 153'
     */ 
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    address: string;
    
    /**
     * Debe ser un numero
     * @example 1254894
     */
    @IsNotEmpty()
    @IsNumber()
    phone: number;
    
    /**
     * Debe ser un string entre 3 y 50 caracteres
     * @example 'New Country'
     */
    @IsString()
    @MinLength(3)  
    @MaxLength(50)
    country: string;
    
    /**
     * Debe ser un string entre 5 y 50 caracteres
     * @example 'New City'
     */
    @IsString()
    @MinLength(5)
    @MaxLength(50)
    city: string;

    @ApiHideProperty()
    @IsEmpty()
    status: boolean;
    
    @ApiHideProperty()
    @IsEmpty()
    isAdmin: boolean;
}