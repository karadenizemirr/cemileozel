import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Appoinment } from "./appoinment.entity";

@Entity()
export class Guest {
    @PrimaryGeneratedColumn()
    id: number; 

    @Column()
    name: string

    @Column()
    surname: string

    @Column()
    identify: string

    @Column()
    gender: string

    @ManyToOne(() => Appoinment, (appoinment) => appoinment.guests)
    appoinment: Appoinment

}