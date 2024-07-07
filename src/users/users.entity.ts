import { ApiHideProperty } from "@nestjs/swagger";
import { Orders } from "src/orders/orders.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({
    name:'users',
})
export class User{

    /**
     * uuid v4 generado por la BBDD
     */
    @PrimaryGeneratedColumn('uuid')
    id: string;

    /**
     * Debe ingresar un string, no nulo, de 50 caracteres como maximo; para los nombres(Nombre Apellido)
     * @example "Juan Perez"
     */
    @Column({type:"varchar", length:50, nullable:false})
    name: string;

    /**
     * Debe ingresar un string, no nulo, de 50 caracteres como maximo y unico; para un email valido
     * @example 'jperez@mail.com'
     */
    @Column({type: "varchar", length:50, nullable:false, unique:true})
    email: string;

    /**
     * Debe ingresar un string, para un password de caracter fuerte(1minuscula, 1 mayuscula, 1numero, 1simbolo)
     * @example 'Juan123+'
     */
    @Column({type:"varchar", length:128, nullable:false})
    password: string;

    /**
     * Debe ingresar un numero entero, para un telefono
     * @example 54912345
     */
    @Column({type:"int"})
    phone:number;

    /**
     * Debe ingresar un string, de 50 caracteres como maximo; para un pais
     * @example 'New Country'
     */
    @Column({type:"varchar", length:50})
    country: string;

    /**
     * Debe ingresar un string, para un direccion(ubicacion)
     * @example 'Street ELM 123'
     */
    @Column()
    address: string;

    /**
     * Debe ingresar un string, de 50 caracteres como maximo; para una ciudad
     * @example 'New City'
     */
    @Column({type:"varchar", length:50})
    city: string;

    @ApiHideProperty()
    @Column({type:"boolean", default:true})
    status: boolean;

    @ApiHideProperty()
    @Column({type:"boolean", default:false})
    isAdmin: boolean;

    @OneToMany(() => Orders, (order) => order.user)
    @JoinColumn({name : 'order_id'})
    orders : Orders[];

}

