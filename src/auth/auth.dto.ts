import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";

export class LoginUserDto{

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

}