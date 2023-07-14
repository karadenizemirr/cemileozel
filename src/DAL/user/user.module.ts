import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { AuthService } from "./auth.service";
import { JwtModule, JwtService } from "@nestjs/jwt";

@Module({
    imports: [
        JwtModule.register({
            secret: 'cemileozel'
        })
    ],
    controllers: [UserController],
    providers: [JwtService],
    exports: [],
})


export class UserModule {}