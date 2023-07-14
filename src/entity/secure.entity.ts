import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Appoinment } from "./appoinment.entity";

@Entity()
export class Secure {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: "null", length:4})
    code: string

    @Column('boolean', {default: false})
    status: boolean

    @Column('boolean', {default: true})
    isPage: boolean

    @Column({default: "null"})
    message: string

    @OneToOne(() => Appoinment, (appoinment) => appoinment.secure)
    appoinment: Appoinment
}