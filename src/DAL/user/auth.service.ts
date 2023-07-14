import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService
    ){}

    async signIn(user:any){
        try{
            const payload = {
                username: user.username,
                sub: user.id
            }

            return {
                access_token: await this.jwtService.signAsync(payload)
            }

        }catch(err){
            console.log('Token service error')
        }
    }
}