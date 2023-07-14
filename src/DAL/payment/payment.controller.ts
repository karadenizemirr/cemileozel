import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { Payment } from "src/entity/payment.entity";

@Controller('payment')
export class PaymentController {
    @Get('all')
    async getAll(@Req() req:Request, @Res() res:Response){
        try{

            // Get All Payment

        }catch(err){
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: "Veriler getirilirken bir sorun meydana geldi."
            }, HttpStatus.BAD_REQUEST)
        }
    }

    // Add Payment
    @Post('add')
    async add(@Req() req:Request, @Res() res:Response, @Body() bodyData:Payment){
        try{

            

        }catch(err){
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: "Veriler getirilirken bir sorun meydana geldi."
            }, HttpStatus.BAD_REQUEST)
        }
    }
}