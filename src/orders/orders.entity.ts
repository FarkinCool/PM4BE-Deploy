import { ApiHideProperty } from "@nestjs/swagger";
import { OrderDetails } from "src/orderDetails/orderDetails.entity";
import { User } from "src/users/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name:'orders',
})
export class Orders{
    /**
    * uuid v4 generado por la BBDD
    */
    @PrimaryGeneratedColumn('uuid')
    id: string;

    /**
     * Debe ser un string del tipo fecha, con el formato yy/mm/dd, no nulo
     */
    @Column({type:"date" , nullable: false})
    date: string;

    @ApiHideProperty()
    @Column({type:"boolean", default:true})
    status: boolean;

    @ManyToOne(() => User, (user) => user.orders)
    @JoinColumn({name: 'user_id'})
    user: User;

    @OneToOne(() => OrderDetails, (orderDetails)=>orderDetails.orders)
    orderDetails: OrderDetails;

}