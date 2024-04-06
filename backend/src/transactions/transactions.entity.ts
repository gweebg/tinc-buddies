import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TransactionStatus, TransactionType } from './transactions.enum';
import { User } from 'src/accounts/accounts.entity';
import { Config } from 'src/configs/configs.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Config)
  @JoinColumn()
  config: Config;

  @Column({
    type: 'float',
  })
  inputAmount: number;

  @Column({
    type: 'float',
    default: 0,
  })
  outputAmount: number;

  @Column()
  date: Date;

  @Column({
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus.PENDING,
  })
  status: TransactionStatus;

  @Column({
    type: 'enum',
    enum: TransactionType,
  })
  type: TransactionType;
}
