import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
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

  @Column(
    {
      default: Number.MAX_VALUE
    }
  )
  maxTransactionAmount: number;

  @Column(
    {
      default: 0
    }
  )
  minTransactionAmount: number;

  @Column(
    {
      default: Number.MAX_VALUE
    }
  )
  maxNumberOfTransactions: number;

  @Column(
    {
      default: 0
    }
  )
  minNumberOfTransactions: number;

  @Column(
    {
      default: TransactionRisk.LOW
    }
  )
  minTransactionRisk: TransactionRisk;

  @Column(
    {
      default: TransactionRisk.HIGH
    }
  )
  maxTransactionRisk: TransactionRisk;

  @Column()
  lookAheadHours: number;

  @Column(
    {
      default: false
    }
  )
  activated: boolean;

}
