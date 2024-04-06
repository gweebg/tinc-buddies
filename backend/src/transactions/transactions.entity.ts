import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { TransactionStatus } from './transactions.enum';
import { User } from 'src/accounts/accounts.entity';
import { Config } from 'src/configs/configs.entity';



@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => Config)
  @JoinColumn()
  config: Config;

  @Column()
  inputAmmount: number;

  @Column()
  inputCurrency: string;

  @Column()
  outputAmmount: number;

  @Column()
  outputCurrency: string;

  @Column()
  date: Date;

  @Column(
    {
      type: 'enum',
      enum: TransactionStatus,
      default: TransactionStatus.PENDING
    }
  )
  status: TransactionStatus;

}
