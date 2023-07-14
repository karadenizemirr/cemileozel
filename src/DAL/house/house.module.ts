import { Module } from "@nestjs/common";
import { HouseController } from "./house.controller";

@Module({
    imports: [],
    controllers: [HouseController],
    providers: [],
})

export class HouseModul {}