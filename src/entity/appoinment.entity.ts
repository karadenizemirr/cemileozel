import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Guest } from "./guest.entity";
import { House } from "./house.entity";
import { IsNotEmpty, Validate } from "class-validator";
import { IdentifyValidator } from "src/validator/identify.validator";
import { CreditCard } from "./creditCard.entity";
import { Secure } from "./secure.entity";

@Entity()
export class Appoinment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string

    @Column({nullable:false})
    phoneNumber: string

    @Column()
    email: string

    @Column()
    identifier: string

    @Column()
    country: string
    
    @Column()
    city: string

    @Column()
    district: string

    @Column('text', {nullable: true})
    message: string

    @Column('date')
    bornDate: Date

    @Column('date')
    startDate: Date

    @Column('date')
    endDate: Date

    @Column('bool', {default: false})
    status: boolean

    @Column()
    totalPrice: number


    @OneToMany(() => Guest, (guest) => guest.appoinment)
    guests: Guest[]

    @OneToMany(() => House, (house) => house.appoinment)
    houses: House[]

    @OneToMany(() => CreditCard, (creditCard) => creditCard.appoinment)
    creditCards: CreditCard[]

    @OneToOne(() => Secure, (secure) => secure.appoinment)
    @JoinColumn()
    secure: Secure
    
}