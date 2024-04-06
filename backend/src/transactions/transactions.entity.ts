import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { TransactionStatus } from './transactions.enum';
import { User } from 'src/accounts/accounts.entity';



@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  profile: User;

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
