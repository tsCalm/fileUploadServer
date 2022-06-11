import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

class TypeOrmConfig {
  static getConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: configService.get('DB_HOST'),
      port: Number(configService.get('DB_PORT')),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      entities: [
        process.env.NODE_ENV === 'dev'
          ? path.join(__dirname, '../**/*.entity.ts')
          : path.join(__dirname, '../**/*.entity.js'),
      ],
      synchronize: false,
      logging: false,
      autoLoadEntities: true,
    };
  }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [],
  useFactory: async (configService: ConfigService) =>
    TypeOrmConfig.getConfig(configService),
  inject: [ConfigService],
};
