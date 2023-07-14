import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './helpers/dbConnect';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as express from 'express';
import * as path from 'path';


// Database Connect
AppDataSource.initialize()
  .then(() => {
    console.log('Database connect success')
  })
  .catch((err) => {
    console.log(err)
    console.log('Database connect error')
  })

async function bootstrap() {
  //const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  
  app.enableCors()
    // Statik dosya sunucusunu yapılandırın
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/public', // Ön ek olarak '/public' kullanın
  });

  app.use(express.static(path.join(__dirname, '..', 'public')));
  app.use(express.static(path.join(__dirname, '..', 'src')));
  await app.init()
  await app.listen(3000);
}
bootstrap();
