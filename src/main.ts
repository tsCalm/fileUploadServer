import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config as aws_config } from 'aws-sdk';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  aws_config.update({
    secretAccessKey: process.env.AWS_ACCESS_KEY_ID,
    accessKeyId: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_S3_REGION,
  });
  const options = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true,
    cookie: {
      maxAge: process.env.JWT_EXPIRES_IN,
      httpObly: true,
    },
  };
  app.enableCors(options);
  await app.listen(process.env.PORT);
}
bootstrap();
