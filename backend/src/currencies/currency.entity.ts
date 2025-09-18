import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['externalId'])
export class Currency {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @Column('smallint')
  externalId: number;

  @Column('varchar', { length: 3 })
  code: string;

  @Column('varchar', { length: 255 })
  name: string;

  @Exclude()
  @Column('timestamp')
  dateStart: Date;

  @Exclude()
  @Column('timestamp')
  dateEnd: Date;

  @Exclude()
  @Column({ type: 'timestamptz' })
  fetchedAt: Date;
}
