import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Appoinment } from "./appoinment.entity";

@Entity()
export class CreditCard {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    surname: string

    @Column()
    cardNumber: string

    @Column()
    month: string

    @Column()
    year: string

    @Column()
    ccv: string

    @ManyToOne(() => Appoinment, (appoinment) => appoinment.creditCards)
    appoinment: Appoinment
}