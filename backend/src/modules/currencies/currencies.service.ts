import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Interval } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, LessThan, MoreThanOrEqual, Repository } from 'typeorm';

import { Currency } from './currency.entity';
import { ApiCurrency } from './interfaces/api-currency.interface';

import { isExpired } from 'src/common/utils/expiration';
import { DATA_EXPIRATION_TIME } from 'src/common/constants/expiration';
import { API_BASE_CURRENCY } from './constants/apiBaseCurrency';

@Injectable()
export class CurrenciesService {
  constructor(
    @InjectRepository(Currency)
    private currencyRepository: Repository<Currency>,
    private dataSource: DataSource,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async getCurrenciesFromApi() {
    const { data } = await firstValueFrom(
      this.httpService.get<ApiCurrency[]>(
        `${this.configService.getOrThrow<string>('EXCHANGE_API_BASE_URL')}/Currencies`,
      ),
    );

    return data;
  }

  async getWhenCurrenciesWereFetched() {
    const result = await this.currencyRepository.findOne({
      where: {},
      order: { id: 'ASC' },
    });
    return result?.fetchedAt;
  }

  async getDistinctCurrenciesFromDatabase() {
    const result = await this.currencyRepository
      .createQueryBuilder('currency')
      .distinctOn(['currency.code'])
      .orderBy('currency.code')
      .getMany();

    return result;
  }

  async getCurrentCurrenciesFromDatabase() {
    const result = await this.currencyRepository
      .createQueryBuilder('currency')
      .distinctOn(['currency.code'])
      .orderBy('currency.code')
      .where('currency.dateStart <= NOW()')
      .andWhere('currency.dateEnd > NOW()')
      .getMany();

    return result;
  }

  createDatabaseCurrencyEntitis(
    currencies: ApiCurrency[],
    fetchedAt: Date,
  ): Currency[] {
    return currencies.map((currency) =>
      this.currencyRepository.create({
        externalId: currency.Cur_ID,
        code: currency.Cur_Abbreviation,
        name: currency.Cur_Name_Eng,
        dateStart: currency.Cur_DateStart,
        dateEnd: currency.Cur_DateEnd,
        fetchedAt,
      }),
    );
  }

  async storeCurrenciesInDatabase(currencies: Currency[]) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(Currency)
        .values(currencies)
        .orUpdate(
          ['code', 'name', 'dateStart', 'dateEnd', 'fetchedAt'],
          ['externalId'],
        )
        .execute();
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async refreshCurrencies() {
    const apiCurrencies = await this.getCurrenciesFromApi();
    const fetchedAt = new Date();

    const currencies = [...apiCurrencies, API_BASE_CURRENCY];

    const databaseCurrencyEntitis = this.createDatabaseCurrencyEntitis(
      currencies,
      fetchedAt,
    );

    await this.storeCurrenciesInDatabase(databaseCurrencyEntitis);
  }

  async getCurrencies<T>(getCurrenciesFunction: () => Promise<T>) {
    const fetchedAt = await this.getWhenCurrenciesWereFetched();

    if (!isExpired(fetchedAt)) {
      return await getCurrenciesFunction();
    }

    await this.refreshCurrencies();

    return await getCurrenciesFunction();
  }

  getDistinctCurrencies() {
    return this.getCurrencies(() => this.getDistinctCurrenciesFromDatabase());
  }

  getCurrentCurrencies() {
    return this.getCurrencies(() => this.getCurrentCurrenciesFromDatabase());
  }

  getAllCurrencies() {
    return this.getCurrencies(() => this.currencyRepository.find());
  }

  getCurrenciesByCodeAndDateRange(
    codes: string[],
    fromDate: Date = new Date(),
    toDate: Date = new Date(),
  ) {
    return this.getCurrencies(() =>
      this.currencyRepository.find({
        where: {
          code: In(codes),
          dateStart: LessThan(fromDate),
          dateEnd: MoreThanOrEqual(toDate),
        },
      }),
    );
  }

  @Interval(DATA_EXPIRATION_TIME)
  async handleRefreshCurrencies() {
    await this.refreshCurrencies();
  }
}
