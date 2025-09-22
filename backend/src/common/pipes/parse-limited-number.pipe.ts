import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseLimitedNumberPipe implements PipeTransform {
  constructor(private readonly min: number = 0) {}

  transform(value: any) {
    const numberValue = Number(value);

    if (isNaN(numberValue)) {
      throw new BadRequestException('Value must be a number');
    }

    if (numberValue < this.min) {
      throw new BadRequestException(
        `Value must be greater than or equal to ${this.min}`,
      );
    }

    return numberValue;
  }
}
