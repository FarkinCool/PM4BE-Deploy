import { ApiHideProperty } from "@nestjs/swagger";
import { Categories } from "src/categories/categories.entity";
import { OrderDetails } from "src/orderDetails/orderDetails.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'products'
})
export class Products{
    /**
    * uuid v4 generado por la BBDD
    */
    @PrimaryGeneratedColumn('uuid')
    id: string;

    /**
     * Debe ingresar un string, de 50 caracteres como maximo, no nulo e unico, para el nombre de un producto
     * @example 'Logitech G pro'
     */
    @Column({type:"varchar", length:50, nullable: false, unique:true })
    name: string;

    /**
     * Debe ingresar un string, no nulo; para la descripcion del producto
     * @example 'el mejor teclado'
     */
    @Column({nullable: false})
    description: string;

    /**
     * Debe ingresar un numero decimal, no nulo, con precision 10 y escala a 2; para el precio del producto
     * @example 96.37
     */
    @Column({type:"decimal", precision:10, scale:2, nullable: false})
    price: number;

    /**
     * Debe ingresar un numero entero, no nulo; para el stock del producto
     * @example 12
     */
    @Column({type:"int", nullable: false})
    stock:number;

    /**
     * Campo para la imagen, se subira mediante otra funcion
     */
    @Column({default: "default.jpg"})
    imgUrl: string;

    @ApiHideProperty()
    @Column({type:"boolean", default:true})
    status: boolean;

    @ManyToOne(() => Categories, (category) => category.products)
    @JoinColumn({name: 'category_id'})
    category : Categories;

    @ManyToMany(() => OrderDetails,(orderDetails) => orderDetails.products)
    ordersDetails: OrderDetails[];

}



