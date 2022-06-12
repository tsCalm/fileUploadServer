import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
      envFilePath:
        process.env.NODE_ENV === 'dev'
          ? path.join(__dirname, '../**/*.entity.ts')
          : path.join(__dirname, '../**/*.entity.js'),
    }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
