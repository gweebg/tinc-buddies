import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'dbuser',
      password: 'dbpass',
      database: 'db',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AccountsModule
  ],
})
export class AppModule {}
