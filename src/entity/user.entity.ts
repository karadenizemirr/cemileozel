import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    name: string

    @Column({nullable: false})
    surname: string

    @Column({nullable: false, unique:true})
    username: string

    @Column({nullable: false})
    password: string

    @Column({nullable:false, unique: true})
    email: string

    @Column({unique: true})
    phoneNumber: string

    @Column({type: 'boolean', default: false})
    isActive: boolean

    @Column({default: 'admin'})
    role: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}