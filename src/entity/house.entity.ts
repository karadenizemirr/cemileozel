import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Image } from "./image.entity";
import { Appoinment } from "./appoinment.entity";

@Entity()
export class House {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    title: string;

    @Column('text')
    description: string;

    @Column('decimal', {precision:10, scale:2})
    price: number;

    @Column()
    location: string;

    @Column({default: true})
    isActive: boolean

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Image, image => image.house)
    images: Image[];

    @ManyToOne(() => Appoinment, (appoinment) => appoinment.houses)
    appoinment: Appoinment;
}

