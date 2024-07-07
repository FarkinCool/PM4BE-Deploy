import { ApiHideProperty } from "@nestjs/swagger";
import { Products } from "src/products/products.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name:'categories',
})
export class Categories{

    /**
    * uuid v4 generado por la BBDD
    */
    @PrimaryGeneratedColumn('uuid')
    id: string;

    /**
     * Debe ser un string de 50 caracteres como maximo, no nulo e unico; para el nombre de una categoria clase de un producto
     */
    @Column({type: "varchar", length:50, nullable:false, unique:true})
    name: string;

    @ApiHideProperty()
    @Column({type:"boolean", default:true})
    status: boolean;
    
    @OneToMany((type) => Products, (products) => products.category)
    @JoinColumn()
    products : Products[]; 

}

