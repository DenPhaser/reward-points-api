import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable
} from '@nestjs/common';
import { map, lastValueFrom } from 'rxjs';

@Injectable()
export class CurrencyService {
  constructor(private readonly httpService: HttpService) {}

  private rates: { [currency: string]: number };
  private ratesExpireAt: Date;

  async convertToJPY(amount: number, currency: string): Promise<number> {
    currency = currency.toUpperCase();

    if (currency === 'JPY') {
      return amount;
    }

    if (
        !this.rates
        ||
        this.ratesExpireAt < new Date()
    ) {
        await this.fetchRates()
    }

    if (!(currency in this.rates)) {
      throw new BadRequestException(`Unknown currency "${currency}".`);
    }

    const convertedAmount = (amount * this.rates['JPY']) / this.rates[currency];

    return convertedAmount;
  }

  private async fetchRates(): Promise<void> {
    const result = await lastValueFrom(
      this.httpService
        .get(`${process.env.CURRENCY_RATES_API}/latest`)
        .pipe(map((response) => response.data)),
    );

    if (!result || !result.rates) {
      throw new Error('Cannot fetch currencies.');
    }

    this.rates = result.rates;
    this.rates['EUR'] = 1; // Default value for that API

    const now = new Date()
    now.setTime(now.getTime() + +process.env.CURRENCY_RATES_EXPIRATION_MINUTES * 60 * 1000)
    this.ratesExpireAt = now

    console.log('Currencies fetched! Storring until', this.ratesExpireAt)
  }
}
