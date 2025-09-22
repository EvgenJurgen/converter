import { Controller, Get, ParseArrayPipe, Query } from '@nestjs/common';
import { RatesService } from './rates.service';

import { ParseCurrencyPipe } from 'src/common/pipes/parse-currency.pipe';
import { ParseLimitedNumberPipe } from 'src/common/pipes/parse-limited-number.pipe';

@Controller('rates')
export class RatesController {
  constructor(private ratesService: RatesService) {}
  @Get('latest')
  getLatestExchangeRates(
    @Query('base', new ParseCurrencyPipe(true)) base?: string,
  ) {
    return this.ratesService.getLatestExchangeRates(base);
  }

  @Get('convert')
  convertCurrencies(
    @Query('from', new ParseCurrencyPipe())
    from: string,
    @Query(
      'to',
      new ParseArrayPipe({ items: String, separator: ',' }),
      new ParseCurrencyPipe(),
    )
    to: string[],
    @Query('amount', new ParseLimitedNumberPipe())
    amount: number,
  ) {
    return this.ratesService.convert(from, to, amount);
  }
}
