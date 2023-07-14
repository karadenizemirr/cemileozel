import { House } from "src/entity/house.entity";
import { User } from "src/entity/user.entity";
import {Image} from 'src/entity/image.entity'

import { DataSource } from "typeorm";
import { Appoinment } from "src/entity/appoinment.entity";
import { Guest } from "src/entity/guest.entity";
import { CreditCard } from "src/entity/creditCard.entity";
import { Secure } from "src/entity/secure.entity";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "administrator",
    password: "123456",
    database: "cemileozel",
    entities: [User,House, Image, Appoinment, Guest, CreditCard,Secure],
    migrations: [__dirname + "/migrations/**/*{.ts,.js}"],
    synchronize: true,
    logging: true,
    subscribers: [],
})