import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';

config();

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.getOrThrow<string>('DATABASE_HOST'),
  port: configService.getOrThrow<number>('DATABASE_PORT'),
  username: configService.getOrThrow<string>('DATABASE_USERNAME'),
  password: configService.getOrThrow<string>('DATABASE_PASSWORD'),
  database: configService.getOrThrow<string>('DATABASE_DATABASE'),
  entities: ['dist/modules/**/*.entity.js'],
  migrations: ['dist/common/database/migrations/*.js'],
  synchronize: configService.get<string>('NODE_ENV') === 'development',
  migrationsRun: configService.get<string>('NODE_ENV') !== 'development',
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
