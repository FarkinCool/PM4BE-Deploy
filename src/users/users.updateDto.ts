import { IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength, Validate, ValidateIf } from "class-validator";
import { MatchPassword } from "src/decorators/matchPassword.decorator";

export class UpdateUserDto {
    /**
     * Debe contener entre 8 y 15 caracteres, e incluir al menos una minuscula, una mayuscula, un numero y un simbolo
     * @example 'userPass123+'
     */
    @IsOptional()
    @IsString()
    @MinLength(8)
    @MaxLength(15)
    @IsStrongPassword({         
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1})
    password?: string;

    /**
     * Debe ser iguales con el password
     * @example 'userPass123+'
     */
    @IsOptional()
    @IsString()
    @ValidateIf(o => o.password !== undefined)
    @IsNotEmpty()
    @Validate(MatchPassword, ['password'])
    confirmpassword?: string;

    /** 
     * Debe ser un string entre 3 y 50 caracteres
     * @example 'street Elm 153'
     */ 
    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    address?: string;

    /**
     * Debe ser un número
     * @example 1254894
     */
    @IsOptional()
    @IsNumber()
    phone?: number;

    /**
     * Debe ser un string entre 3 y 50 caracteres
     * @example 'New Country'
     */
    @IsOptional()
    @IsString()
    @MinLength(3)  
    @MaxLength(50)
    country?: string;

    /**
     * Debe ser un string entre 5 y 50 caracteres
     * @example 'New City'
     */
    @IsOptional()
    @IsString()
    @MinLength(5)
    @MaxLength(50)
    city?: string;

}
