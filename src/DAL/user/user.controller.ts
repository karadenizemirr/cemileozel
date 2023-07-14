import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Req, Res } from "@nestjs/common";
import { AppDataSource } from "src/helpers/dbConnect";
import {Request, Response} from 'express'
import { User } from "src/entity/user.entity";
import * as bcrypt from 'bcrypt'
import { JwtService } from "@nestjs/jwt";



@Controller('user')
export class UserController {
    private userRepository:any;

    constructor(
        private readonly jwtService: JwtService

    ){
        this.userRepository = AppDataSource.getRepository('User');
    }


    // Get All Users
    @Get('all')
    async getAllUsers(@Req() req:Request, @Res() res:Response){
        try{

            const users = await this.userRepository.find()
            res.json({
                "message": "Başarılı",
                "data": users
            })
            
        }catch(err){
            throw new HttpException({
                message: "Kullanıcılara ulaşılamadı",
                status: HttpStatus.BAD_REQUEST
            }, HttpStatus.BAD_REQUEST)
        }
    }

    // Get By Id
    @Get('get/:id')
    async getByIdUser(@Req() req:Request, @Res() res:Response, @Param('id') id:number){
        try{

            const user = await this.userRepository.findOneBy({
                id: id
            })

            res.json({
                "message": "Başarılı",
                "data": user
            })

        }catch(err){
            throw new HttpException({
                message: "Kullanıcı bulunamadı",
                status: HttpStatus.BAD_REQUEST
            }, HttpStatus.BAD_REQUEST)
        }
    }


    // Add User
    @Post('add')
    async addUser(@Req() req:Request, @Res() res:Response, @Body() bodyData:User){
        try{
            // Password Encrypt
            const encPassword = await bcrypt.hash(bodyData.password, 5)
            bodyData.password = encPassword

            // Save Data
            await this.userRepository.save(bodyData)

            res.json({
                "message": "Basarılı",
                "data": bodyData
            })
        }catch(err){
            throw new HttpException({
                message: "Kullanıcı oluşturulurken bir sorun meydana geldi.",
                status: HttpStatus.BAD_REQUEST,
                error: err
            }, HttpStatus.BAD_REQUEST)
        }
    }
    
    // Delete User
    @Get('delete/:id')
    async deleteUser(@Req() req:Request, @Res() res:Response, @Param('id') id:number){
        try{

            const user = await this.userRepository.findOne({
                id: id
            })

            if (user){
                await this.userRepository.remove(user)

                res.json({
                    "message": "Basarılı",
                    "data": user
                })
            }

        }catch(err){
            throw new HttpException({
                message: "Kullanıcı silinirken bir sorun meydana geldi.",
                status: HttpStatus.BAD_REQUEST
            }, HttpStatus.BAD_REQUEST)
        }
    }

    // Update User
    @Post('update/:id')
    async updateUser(@Req() req:Request, @Res() res:Response, @Param('id') id:number, @Body() bodyData:User){
        try{

            const user = await this.userRepository.findOne({
                id: id
            })

            if(user){
                
                // Password Encrypt
                const encPassword = await bcrypt.hash(bodyData.password, 5)
                bodyData.password = encPassword

                await this.userRepository.update(user, bodyData)
            }

        }catch(err){
            throw new HttpException({
                message: "Kullanıcı güncellenirken bir sorun meydana geldi.",
                status: HttpStatus.BAD_REQUEST
            }, HttpStatus.BAD_REQUEST)
        }
    }

    @Post('login')
    async userLogin(@Req() req: Request, @Res() res: Response, @Body() loginData: any) {

        try {
          const username = loginData.username;
          const password = loginData.password;
      
          const user = await this.userRepository.findOne({
            where: {
              username: username
            }
          });
      
          if (user) {
            const passwordMatches = await bcrypt.compare(password, user.password);
            if (passwordMatches) {

                const token = await this.jwtService.signAsync({
                  username: user.username,
                  sub: user.id
                }, {secret: 'cemileozel'})
            
              res.json({
                "message": "Başarılı",
                "token": token
              });

            }
          }
          
      
        } catch (err) {
          throw new HttpException({
            message: "Kullanıcı bulunamadı",
            status: HttpStatus.BAD_REQUEST
          }, HttpStatus.BAD_REQUEST);
        }
      }
}