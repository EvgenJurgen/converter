import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Interval } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, LessThan, Repository } from 'typeorm';

import { Rate } from './rate.entity';
import { ApiRate } from './interfaces/api-rate.interface';

import { CurrenciesService } from 'src/modules/currencies/currencies.service';
import { Currency } from 'src/modules/currencies/currency.entity';

import { isExpired } from 'src/common/utils/expiration';
import { DATA_EXPIRATION_TIME } from 'src/common/constants/expiration';

@Injectable()
export class RatesService {
  constructor(
    @InjectRepository(Rate)
    private rateRepository: Repository<Rate>,
    private dataSource: DataSource,
    private httpService: HttpService,
    private configService: ConfigService,
    private currenciesService: CurrenciesService,
  ) {}

  async getExchangeRatesFromApi(periodicity: 0 | 1) {
    const { data } = await firstValueFrom(
      this.httpService.get<ApiRate[]>(
        `${this.configService.getOrThrow<string>('EXCHANGE_API_BASE_URL')}/Rates?Periodicity=${periodicity}`,
      ),
    );

    return data;
  }

  async getLatestExchangeRatesFromApi() {
    const [dailyRates, monthlyRates] = await Promise.all([
      this.getExchangeRatesFromApi(0),
      this.getExchangeRatesFromApi(1),
    ]);

    return [...dailyRates, ...monthlyRates];
  }

  async getWhenLatestExchangeRateWasFetched() {
    const result = await this.rateRepository.findOne({
      where: { fetchedAt: LessThan(new Date()) },
      order: { fetchedAt: 'DESC' },
    });

    return result?.fetchedAt;
  }

  async getLatestExchangeRatesFromDatabase() {
    const fetchedAt = await this.getWhenLatestExchangeRateWasFetched();
    return this.rateRepository
      .createQueryBuilder('rate')
      .where('rate.fetchedAt = :fetchedAt', { fetchedAt })
      .leftJoinAndSelect('rate.currency', 'currency')
      .getMany();
  }

  async getLatestExchangeRatesByCurrenciesFromDatabase(currencies: Currency[]) {
    const fetchedAt = await this.getWhenLatestExchangeRateWasFetched();
    return this.rateRepository
      .createQueryBuilder('rate')
      .where('rate.currency.id IN (:...currencies)', {
        currencies: currencies.map(({ id }) => id),
      })
      .andWhere('rate.fetchedAt = :fetchedAt', { fetchedAt })
      .leftJoinAndSelect('rate.currency', 'currency')
      .getMany();
  }

  getUnfoundCurrencyIdsForExchangeRates(
    rates: ApiRate[],
    currencies: Currency[],
  ) {
    const currencyExternalIds = currencies.map(
      (currency) => currency.externalId,
    );

    return rates
      .filter((rate) => !currencyExternalIds.includes(rate.Cur_ID))
      .map((rate) => rate.Cur_ID);
  }

  async getCurrenciesForRates(rates: ApiRate[]) {
    const currencies = await this.currenciesService.getAllCurrencies();

    const unfoundCurrencyIdsForExchangeRates =
      this.getUnfoundCurrencyIdsForExchangeRates(rates, currencies);

    if (unfoundCurrencyIdsForExchangeRates.length === 0) {
      return currencies;
    }

    await this.currenciesService.refreshCurrencies();

    const newCurrencies = await this.currenciesService.getAllCurrencies();

    const newUnfoundCurrencyIdsForExchangeRates =
      this.getUnfoundCurrencyIdsForExchangeRates(rates, newCurrencies);

    if (newUnfoundCurrencyIdsForExchangeRates.length === 0) {
      return newCurrencies;
    }

    throw new Error(
      `Cannot find ${newUnfoundCurrencyIdsForExchangeRates.join(',')} rate's currencies in currencies`,
    );
  }

  createDatabaseRateEntitis(
    rates: ApiRate[],
    currencies: Currency[],
    fetchedAt: Date,
  ) {
    return rates.map((rate) =>
      this.rateRepository.create({
        rate: rate.Cur_OfficialRate,
        scale: rate.Cur_Scale,
        fetchedAt,
        currency: currencies.find(
          (currency) => currency.externalId === rate.Cur_ID,
        ),
      }),
    );
  }

  async storeRatesInDatabase(rates: Rate[]) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(Rate, rates);

      await queryRunner.commitTransaction();
    } catch {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async getNewExchangeRates() {
    const apiRates = await this.getLatestExchangeRatesFromApi();
    const fetcheadAt = new Date();

    const currencies = await this.getCurrenciesForRates(apiRates);

    const databaseEntityRates = this.createDatabaseRateEntitis(
      apiRates,
      currencies,
      fetcheadAt,
    );

    await this.storeRatesInDatabase(databaseEntityRates);
  }

  async getExchangeRates<T>(getExchangeRatesFromDatabase: () => Promise<T>) {
    const whenLatestExchangeRateWasFetched =
      await this.getWhenLatestExchangeRateWasFetched();

    if (!isExpired(whenLatestExchangeRateWasFetched)) {
      return await getExchangeRatesFromDatabase();
    }

    await this.getNewExchangeRates();

    return await getExchangeRatesFromDatabase();
  }

  recalculateExchangeRatesBasedOnBaseCurrency(rates: Rate[], base: string) {
    const baseRate = rates.find((rate) => rate.currency.code === base);
    if (!baseRate) {
      throw new BadRequestException(`Could not foind ${base} base currency`);
    }

    return rates.map(({ rate, scale, ...rest }) => {
      const newRate = new Rate();
      Object.assign(newRate, rest);
      newRate.rate = +((rate * baseRate.scale) / baseRate.rate).toFixed(4);
      newRate.scale = scale;

      return newRate;
    });
  }

  async getLatestExchangeRates(base?: string) {
    const latestExchangeRates = await this.getExchangeRates(() =>
      this.getLatestExchangeRatesFromDatabase(),
    );

    return base
      ? this.recalculateExchangeRatesBasedOnBaseCurrency(
          latestExchangeRates,
          base,
        )
      : latestExchangeRates;
  }

  getUnfoundCurrencyCodesInCurrencies(
    currencyCodes: string[],
    currencies: Currency[],
  ) {
    return currencyCodes.filter(
      (currencyCode) =>
        !currencies.find((currency) => currency.code === currencyCode),
    );
  }

  async convert(from: string, to: string[], amount: number) {
    const currencyCodes = to.includes(from) ? to : [from, ...to];
    const currencies =
      await this.currenciesService.getCurrenciesByCodeAndDateRange(
        currencyCodes,
      );

    const unfoundCurrencyCodes = this.getUnfoundCurrencyCodesInCurrencies(
      currencyCodes,
      currencies,
    );

    if (unfoundCurrencyCodes.length) {
      throw new BadRequestException(
        `Could not find ${unfoundCurrencyCodes.join(',')} in currencies`,
      );
    }

    const latestExchangeRates = await this.getExchangeRates(() =>
      this.getLatestExchangeRatesByCurrenciesFromDatabase(currencies),
    );

    const baseRate = latestExchangeRates.find(
      (rate) => rate.currency.code === from,
    );

    if (!baseRate) {
      throw new BadRequestException(
        `Could not find ${from} currency exchange rate in rates`,
      );
    }

    return currencyCodes.reduce((prev, current) => {
      if (current === from) {
        return { ...prev, [current]: amount };
      } else {
        const targetRate = latestExchangeRates.find(
          (rate) => rate.currency.code === current,
        );

        if (!targetRate) {
          throw new BadRequestException(
            `Could not find ${current} currency exchange rate in rates`,
          );
        }

        return {
          ...prev,
          [current]: +(
            ((targetRate.scale * baseRate.rate) /
              (baseRate.scale * targetRate.rate)) *
            amount
          ).toFixed(4),
        };
      }
    }, {});
  }

  @Interval(DATA_EXPIRATION_TIME)
  async handleGetNewExchangeRates() {
    await this.getNewExchangeRates();
  }
}
