import { Controller, Get } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';

@Controller('currencies')
export class CurrenciesController {
  constructor(private currenciesService: CurrenciesService) {}
  @Get()
  getCurrencies() {
    return this.currenciesService.getDistinctCurrencies();
  }

  @Get('current')
  getCurrentCurrencies() {
    return this.currenciesService.getCurrentCurrencies();
  }
}
