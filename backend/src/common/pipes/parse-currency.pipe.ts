import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseCurrencyPipe implements PipeTransform {
  constructor(private readonly optional = false) {}

  transform(value: any) {
    const validate = (val: any) => {
      if (this.optional && (val === undefined || val === '')) {
        return undefined;
      }
      if (typeof val !== 'string') {
        throw new BadRequestException('Currency must be a string');
      }
      const isValid = /^[A-Z]{3}$|^[a-z]{3}$/.test(val);
      if (!isValid) {
        throw new BadRequestException(
          `Invalid currency: "${val}". Must be 3 uppercase or lowercase letters (e.g., USD or usd)`,
        );
      }
      return val.toUpperCase();
    };

    if (Array.isArray(value)) {
      return value.map(validate);
    } else {
      return validate(value);
    }
  }
}
