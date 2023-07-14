import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { House } from "./house.entity";

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    path: string;

    @Column()
    title: string;

    @ManyToOne(() => House, house => house.images)
    house: House;
}