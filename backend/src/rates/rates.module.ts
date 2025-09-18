import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatesController } from './rates.controller';
import { RatesService } from './rates.service';
import { Rate } from './rate.entity';
import { CurrenciesModule } from 'src/currencies/currencies.module';

@Module({
  imports: [TypeOrmModule.forFeature([Rate]), HttpModule, CurrenciesModule],
  controllers: [RatesController],
  providers: [RatesService],
})
export class RatesModule {}
