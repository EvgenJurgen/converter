import {
  Controller,
  Get,
  ParseArrayPipe,
  ParseFloatPipe,
  Query,
} from '@nestjs/common';
import { RatesService } from './rates.service';

@Controller('rates')
export class RatesController {
  constructor(private ratesService: RatesService) {}
  @Get('latest')
  getLatestExchangeRates() {
    return this.ratesService.getLatestExchangeRates();
  }

  @Get('convert')
  convertCurrencies(
    @Query('from')
    from: string,
    @Query('to', new ParseArrayPipe({ items: String, separator: ',' }))
    to: string[],
    @Query('amount', ParseFloatPipe)
    amount: number,
  ) {
    return this.ratesService.convert(from, to, amount);
  }
}
