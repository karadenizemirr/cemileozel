import { Module } from "@nestjs/common";
import { AppoinmentController } from "./appoinment.controller";

@Module({
    controllers: [AppoinmentController],
    providers: [],
    exports: [],
})

export class AppoinmentModule {}