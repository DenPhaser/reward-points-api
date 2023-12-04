import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CurrencyService {
    
    private readonly exchangeRates: { [from: string]: { [to: string]: number } } = {
        'JPY': {
            'JPY': 1
        },
        'USD': {
            'JPY': 147.16
        },
        'EUR': {
            'JPY': 159.45
        },
        'GBP': {
            'JPY': 185.87
        },
        'PLN': {
            'JPY': 36.80 
        },
    }
    
    async convertToJPY(amount: number, currency: string): Promise<number> {
        currency = currency.toUpperCase()

        if (!this.exchangeRates[currency]){
            throw new NotFoundException(`Unknown currency "${currency}".`)
        }
        
        return this.exchangeRates[currency]['JPY'] * amount
    }
}
