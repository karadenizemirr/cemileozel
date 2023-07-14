import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Req, Res } from "@nestjs/common";
import { Appoinment } from "src/entity/appoinment.entity";
import { AppDataSource } from "src/helpers/dbConnect";
import {Request, Response} from 'express'
import { CreditCard } from "src/entity/creditCard.entity";
import { Secure } from "src/entity/secure.entity";


@Controller('appoinment')
export class AppoinmentController {
    private appoinmentRepository:any
    private creditCardRepository:any
    private secureRepository:any

    constructor(){
        this.appoinmentRepository = AppDataSource.getRepository(Appoinment)
        this.creditCardRepository = AppDataSource.getRepository(CreditCard)
        this.secureRepository = AppDataSource.getRepository(Secure)
    }

    // Add Appoinment
    @Post('add')
    async addAppoinment(
        @Body() bodyData:any,
        @Req() req:Request,
        @Res() res:Response
        ){
        try{
            const appoinment = new Appoinment()
            appoinment.name = bodyData.appoinment.formData.name
            appoinment.surname = bodyData.appoinment.formData.surname
            appoinment.phoneNumber = bodyData.appoinment.formData.phoneNumber
            appoinment.email = bodyData.appoinment.formData.email
            appoinment.identifier = bodyData.appoinment.formData.identifier
            appoinment.country = bodyData.appoinment.formData.country
            appoinment.city = bodyData.appoinment.formData.city
            appoinment.district = bodyData.appoinment.formData.district
            appoinment.message = bodyData.appoinment.formData.message
            appoinment.startDate = bodyData.appoinment.formData.startDate
            appoinment.endDate = bodyData.appoinment.formData.endDate
            appoinment.bornDate = bodyData.appoinment.formData.bornDate
            appoinment.totalPrice = bodyData.totalPrice
            await this.appoinmentRepository.save(appoinment)

            // Save Credit Card
            
            const creditCard = new CreditCard()
            creditCard.cardNumber = bodyData.payment.cardNumber
            creditCard.month = bodyData.payment.month
            creditCard.year = bodyData.payment.year
            creditCard.ccv = bodyData.payment.ccv
            creditCard.name = bodyData.payment.name
            creditCard.surname = bodyData.payment.surname
            creditCard.appoinment = appoinment
            await this.creditCardRepository.save(creditCard)

            const secure = new Secure()
            secure.appoinment = appoinment
            await this.secureRepository.save(secure)



            res.json({
                "message": "Başarılı",
                "data": appoinment
            })

        }catch(err){
            console.log(err)
            throw new HttpException({
                message: "Kullanıcı oluşturulurken bir sorun meydana geldi.",
                status: HttpStatus.BAD_REQUEST,
                error: err
            }, HttpStatus.BAD_REQUEST)
        }
    }

    // Get All
    @Get('all')
    async getAll(@Res() res:Response){
        try{

            const appoinmentData = await this.appoinmentRepository.find(
                {
                    relations: ['creditCards','secure'],
                    order: {
                        id: 'DESC'
                    }
                }
                )

            res.json({
                "message": "Başarılı",
                "data": appoinmentData
            })

        }catch(err){
            console.log(err)
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: "Veriler getirilirken bir sorun meydana geldi."
            }, HttpStatus.BAD_GATEWAY)
        }
    }

    // Get By ID
    @Get('get/:id')
    async getById(@Res() res:Response, @Param('id') id:number){
        try {
            const appoinmentData = await this.appoinmentRepository.findOne({
                where: {
                    id: id
                },
                relations: {
                    secure:true,
                    creditCards: true
                }
            })

            res.json({
                "message": "Başarılı",
                "data": appoinmentData
            })
        }catch(err){
            console.log(err)
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: "Veriler getirilirken bir sorun meydana geldi."
            }, HttpStatus.BAD_GATEWAY)
        }
    }

    // Get by identify no
    @Get('get/:identity')
    async getByIdentify(@Res() res:Response, @Param('identity') identity:number){
        try{

            const appoinmentData = await this.appoinmentRepository.findOne({
                where: {
                    identifier: identity
                },
                relations: {
                    guests: true,
                    houses: true
                },
            })

            res.json({
                "message": "Başarılı",
                "data": appoinmentData
            })

        }catch(err){
            console.log(err)
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: "Veriler getirilirken bir sorun meydana geldi."
            }, HttpStatus.BAD_GATEWAY)
        }
    }

    // Delete
    @Get('delete/:id')
    async delete(@Res() res:Response, @Param('id') id:number){
        try{

            const appoinmentData = await this.appoinmentRepository.findOne({
                where: {
                    id: id
                },
                relations: {
                    guests: true,
                    houses: true
                }
            })

            if (appoinmentData){
                await this.appoinmentRepository.remove(appoinmentData)
            }


        }catch(err){
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: "Veriler getirilirken bir sorun meydana geldi."
            }, HttpStatus.BAD_GATEWAY)
        }
    }

    // Secure Update and Add
    @Post('secure/update/:id')
    async secureAddAndUpdate(@Param('id') id:number, @Req() req:Request, @Body() bodyData:any){
        try{
           
           const appoinmentData = await this.appoinmentRepository.findOne({
            where: {
                id: id
            },
            relations: {
                secure:true
            }
        })

        appoinmentData.secure = { ...appoinmentData.secure, ...bodyData };
        const response = await this.secureRepository.save(appoinmentData.secure)

        return {
            "message": "başarılı",
            "data": response
        }

        }catch(err){
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: "Veriler getirilirken bir sorun meydana geldi."
            }, HttpStatus.BAD_GATEWAY)
        }
    }
    // Get Secure
    @Get('secure/get/:id')
    async getSecure(@Param('id') id:number, @Res() res:Response){
        try{
            const appoinmentData = await this.appoinmentRepository.findOne({
                where: {
                    id: id
                },
                relations: {
                    secure:true
                }
            })

            res.json({
                "message": "Başarılı",
                "data": appoinmentData
            })
            
        }catch(err){
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: "Veriler getirilirken bir sorun meydana geldi."
            }, HttpStatus.BAD_GATEWAY)
        }
    }
}