import { Exclude, Expose } from 'class-transformer';
import { Currency } from 'src/modules/currencies/currency.entity';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@Index(['currency', 'fetchedAt'], { unique: true })
@Index(['fetchedAt'])
export class Rate {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 4 })
  rate: number;

  @Column('int')
  scale: number;

  @Exclude()
  @Column({ type: 'timestamptz' })
  fetchedAt: Date;

  @Exclude()
  @ManyToOne(() => Currency)
  currency: Currency;

  @Expose()
  get currencyCode(): string {
    return this.currency.code;
  }

  @Expose()
  get currencyName(): string {
    return this.currency.name;
  }
}
