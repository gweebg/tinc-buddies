import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { TransactionRisk } from './configs.enum';
import { User } from 'src/accounts/accounts.entity';

@Entity()
export class Config {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'float', default: 0 })
  budget: number;

  @Column({
    default: 0,
    type: 'float',
  })
  acquired: number;

  @Column({
    default: 9999,
  })
  maxTransactionAmount: number;

  @Column({
    default: 0,
  })
  minTransactionAmount: number;

  @Column({
    default: 9999,
  })
  maxNumberOfTransactions: number;

  @Column({
    default: TransactionRisk.LOW,
  })
  minTransactionRisk: TransactionRisk;

  @Column({
    default: TransactionRisk.HIGH,
  })
  maxTransactionRisk: TransactionRisk;

  @Column({
    default: 24,
  })
  lookAheadHours: number;

  @Column({
    default: false,
  })
  activated: boolean;
}
