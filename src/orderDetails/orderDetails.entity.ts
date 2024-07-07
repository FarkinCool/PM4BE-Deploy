import { Orders } from "src/orders/orders.entity";
import { Products } from "src/products/products.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name:'order_details'
})
export class OrderDetails{
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({type: "decimal", precision:10, scale:2, nullable:false})
    price: number;

    // order_id: Relación 1:1 con orders.
    @OneToOne((type) => Orders, (order)=> order.orderDetails)
    @JoinColumn({name: 'order_id'})
    orders: Orders;

    // Relación N:N con products.
    @ManyToMany((type) => Products)
    @JoinTable({
        name: 'orderdetails_products',
        joinColumn: {
            name: 'product_id',
            referencedColumnName:'id'
        },
        inverseJoinColumn:{
            name: 'orderdetail_id',
            referencedColumnName: 'id'
        }
    })
    products: Products[];
}

// id: debe ser un valor único generado automáticamente en formato UUID. No puede ser nulo y actúa como la clave primaria de la entidad.
// price: debe ser un número decimal con una precisión de 10 dígitos y una escala de 2 dígitos. No puede ser nulo. 