import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'database/datasource';
import { getEnvFilePath } from 'shared/utils/env';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvFilePath(),
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
