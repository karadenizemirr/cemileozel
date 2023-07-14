import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Req, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { House } from "src/entity/house.entity";
import { Image } from "src/entity/image.entity";
import { AppDataSource } from "src/helpers/dbConnect";
import { Request, Response } from "express";
import {diskStorage} from 'multer'
import * as fs from 'fs';

@Controller('house')
export class HouseController {
    private houseRepository:any
    private imageRepository:any

    constructor(){
        this.houseRepository = AppDataSource.getRepository(House)
        this.imageRepository = AppDataSource.getRepository(Image)
        
    }

    // GetAll
    @Get('all')
    async getAll(@Req() req:Request, @Res() res:Response){
        try {
            const house = await this.houseRepository
            .createQueryBuilder("house")
            .leftJoinAndSelect("house.images", "image")
            .getMany()
            
            res.json({
                "message": "Başarılı",
                "data": house
            })
            
        }catch(err){
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: "Veriler getirilirken bir sorun meydana geldi."
            }, HttpStatus.BAD_GATEWAY)
        }
    }

    // GetById
    @Get('get/:id')
    async getById(@Param('id') id:number, @Req() req:Request, @Res() res:Response){
        try {
            const house = await this.houseRepository.findOne({
                where: {
                    id: id
                },
                relations: {
                    images: true
                }
            })
            
            res.json({
                "message": "Başarılı",
                "data": house
            })
        }catch(err){
            console.log(err)
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: "Veriler getirilirken bir sorun meydana geldi."
            }, HttpStatus.BAD_GATEWAY)
        }
    }

    // Add House
    @Post('add')
    @UseInterceptors(FilesInterceptor('image',5, {
        storage:diskStorage({
            destination: './public/images/house',
            filename: (req,file,cb)=>{
                const name = file.originalname.split(".")[0].toLowerCase()
                const fileExtension = file.originalname.split(".")[1]
                const newFileName = name.split(" ").join("-") + "-" + Date.now() + "." + fileExtension

                cb(null,newFileName)
            }
        })
    }))
    async addHouse(
        @Body() bodyData:House,
        @Req() req:Request,
        @Res() res:Response,
        @UploadedFiles() files: Array<Express.Multer.File>
        ){
        try {
            
            // New House

            const house = new House()
            house.title = bodyData.title
            house.description = bodyData.description
            house.price = bodyData.price
            house.location = bodyData.location

            const saveHouse = await this.houseRepository.save(house)

            if(files){
                files.forEach(async (file) => {
                    const image = new Image()
                    image.path = file.path
                    image.title = file.filename
                    image.house = house
                    await this.imageRepository.save(image)
                })
            }


            res.json({
                "message": "Basarılı",
                "data": saveHouse
            })


        }catch(err){
            console.log(err)
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: "Veriler eklenirken bir sorun meydana geldi."
            }, HttpStatus.BAD_GATEWAY)
        }
    }

    // Delete Operations
    @Get('delete/:id')
    async deleteHouse(@Req() req:Request, @Res() res:Response, @Param('id') id:number){
        try{

            const house = this.houseRepository.findOne({
                where: {
                    id: id
                },
                relations: {
                    images: true
                }
            })

            if (house){
                
                const imageIds = await this.imageRepository
                    .createQueryBuilder('image')
                    .select('image.id')
                    .where('image.houseId = :id', {id:house.id})
                    .getMany()
                
                if (imageIds.length > 0){
                    const imagePath = imageIds.map((image) => image.path)

                    // Delete Image
                    imagePath.forEach((p) => {
                        fs.unlinkSync(p)
                    })
                }

                await this.imageRepository.delete(imageIds)
                await this.houseRepository.delete(id)
            }

            
        }catch(err){
            console.log(err)
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: "Veri silinirken bir sorun meydana geldi."
            }, HttpStatus.BAD_GATEWAY)
        }
    }

    // Update Operations
    @Post('update/:id')
    @UseInterceptors(FilesInterceptor('image',5, {
        storage: diskStorage({
            destination: './public/images/house',
            filename: (req,file,cb)=>{
                const name = file.originalname.split(".")[0].toLowerCase()
                const fileExtension = file.originalname.split(".")[1]
                const newFileName = name.split(" ").join("-") + "-" + Date.now() + "." + fileExtension

                cb(null, newFileName)
            }
        })
    }))
    async updateHouse(@Req() req:Request, @Res() res:Response, @Param() id:number, @Body() bodyData:House, @UploadedFiles() files:Array<Express.Multer.File>){
        try{
            const house = this.houseRepository.findOneBy({
                id: id
            })

            if (house){
                
                await this.houseRepository.update(id, bodyData)
                
                res.json({
                    "message": "Basarılı",
                    "data": bodyData
                })
                
            }
        }catch(err){
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: "Veri güncellenirken bir sorun meydana geldi."
            }, HttpStatus.BAD_GATEWAY)
        }
    }
}