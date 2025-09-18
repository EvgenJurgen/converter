import { Controller, Get, ParseArrayPipe, Query } from '@nestjs/common';
import { RatesService } from './rates.service';

import { ParseCurrencyPipe } from 'shared/pipes/parse-currency.pipe';
import { ParseLimitedNumberPipe } from 'shared/pipes/parse-limited-number.pipe';

@Controller('rates')
export class RatesController {
  constructor(private ratesService: RatesService) {}
  @Get('latest')
  getLatestExchangeRates() {
    return this.ratesService.getLatestExchangeRates();
  }

  @Get('convert')
  convertCurrencies(
    @Query('from', ParseCurrencyPipe)
    from: string,
    @Query(
      'to',
      new ParseArrayPipe({ items: String, separator: ',' }),
      ParseCurrencyPipe,
    )
    to: string[],
    @Query('amount', new ParseLimitedNumberPipe())
    amount: number,
  ) {
    return this.ratesService.convert(from, to, amount);
  }
}
